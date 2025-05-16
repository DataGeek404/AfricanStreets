
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');
const axios = require('axios');
const { executeQuery } = require('../database/connection');
const logger = require('../utils/logger');

// Set up PayPal environment
const getPayPalClient = () => {
  const environment = process.env.PAYPAL_MODE === 'live'
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID, 
        process.env.PAYPAL_CLIENT_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID, 
        process.env.PAYPAL_CLIENT_SECRET
      );
  
  return new paypal.core.PayPalHttpClient(environment);
};

// Log payment events
const logPayment = async (paymentProvider, paymentId, donationId, requestData, responseData, status) => {
  try {
    await executeQuery(
      `INSERT INTO payment_logs (
        payment_provider, payment_id, donation_id, request_data, response_data, status
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        paymentProvider, 
        paymentId, 
        donationId, 
        JSON.stringify(requestData), 
        JSON.stringify(responseData), 
        status
      ]
    );
  } catch (error) {
    logger.error(`Error logging payment: ${error.message}`);
  }
};

// @desc    Process a Stripe payment
// @route   POST /api/payments/stripe
// @access  Public
const processStripePayment = async (req, res, next) => {
  try {
    const { amount, currency = 'usd', donorInfo, description } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      description,
      metadata: {
        donor_name: donorInfo?.name || 'Anonymous',
        donor_email: donorInfo?.email || '',
        is_anonymous: donorInfo?.isAnonymous ? 'true' : 'false',
      },
    });

    await logPayment(
      'stripe',
      paymentIntent.id,
      null, // donation not created yet
      req.body,
      { client_secret: paymentIntent.client_secret },
      'created'
    );

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process a PayPal payment
// @route   POST /api/payments/paypal
// @access  Public
const processPayPalPayment = async (req, res, next) => {
  try {
    const { amount, currency = 'USD', donorInfo, description } = req.body;

    const paypalClient = getPayPalClient();
    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString()
          },
          description
        }
      ],
      application_context: {
        brand_name: 'Africa Street Therapy Medicine',
        shipping_preference: 'NO_SHIPPING'
      }
    });

    const response = await paypalClient.execute(request);
    
    await logPayment(
      'paypal',
      response.result.id,
      null, // donation not created yet
      req.body,
      response.result,
      'created'
    );

    res.status(200).json({
      orderId: response.result.id,
      approvalUrl: response.result.links.find(link => link.rel === 'approve').href
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process M-Pesa payment
// @route   POST /api/payments/mpesa
// @access  Public
const processMpesaPayment = async (req, res, next) => {
  try {
    const { 
      phoneNumber, 
      amount, 
      accountReference = 'ASTM Donation',
      transactionDesc = 'Donation to Africa Street Therapy Medicine'
    } = req.body;
    
    // Format the phone number to required format (remove country code if present)
    let formattedPhone = phoneNumber;
    if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone.substring(3);
    }

    // Generate timestamp (YYYYMMDDHHmmss)
    const timestamp = new Date().toISOString()
      .replace(/[-T:\.Z]/g, '')
      .slice(0, 14);
    
    // Get OAuth token
    const authResponse = await getMpesaAuthToken();
    
    // Prepare STK Push request
    const stkRequest = {
      BusinessShortCode: process.env.MPESA_SHORT_CODE,
      Password: Buffer.from(
        `${process.env.MPESA_SHORT_CODE}${process.env.MPESA_PASSKEY}${timestamp}`
      ).toString('base64'),
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    };
    
    // Make request to M-Pesa API
    const response = await axios.post(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authResponse.access_token}`
        }
      }
    );
    
    await logPayment(
      'mpesa',
      response.data.CheckoutRequestID,
      null, // donation not created yet
      req.body,
      response.data,
      'initiated'
    );
    
    res.status(200).json({
      checkoutRequestId: response.data.CheckoutRequestID,
      merchantRequestId: response.data.MerchantRequestID,
      responseCode: response.data.ResponseCode,
      responseDescription: response.data.ResponseDescription
    });
  } catch (error) {
    logger.error(`M-Pesa error: ${error.message}`);
    next(error);
  }
};

// @desc    Handle M-Pesa callback
// @route   POST /api/payments/mpesa/callback
// @access  Public (protected by M-Pesa)
const handleMpesaCallback = async (req, res, next) => {
  try {
    const callbackData = req.body;
    
    logger.info(`M-Pesa callback received: ${JSON.stringify(callbackData)}`);
    
    // Extract data from callback
    const resultCode = callbackData.Body.stkCallback.ResultCode;
    const resultDesc = callbackData.Body.stkCallback.ResultDesc;
    const checkoutRequestId = callbackData.Body.stkCallback.CheckoutRequestID;
    
    if (resultCode === 0) {
      // Payment was successful
      const items = callbackData.Body.stkCallback.CallbackMetadata.Item;
      const amount = items.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = items.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = items.find(item => item.Name === 'PhoneNumber')?.Value;
      
      await logPayment(
        'mpesa',
        checkoutRequestId,
        null,
        {},
        callbackData,
        'completed'
      );

      // You can create a donation record here or update an existing one
      
      res.status(200).json({ result: "Accepted" });
    } else {
      // Payment failed
      await logPayment(
        'mpesa',
        checkoutRequestId,
        null,
        {},
        callbackData,
        'failed'
      );
      
      res.status(200).json({ result: "Rejected" });
    }
  } catch (error) {
    logger.error(`M-Pesa callback error: ${error.message}`);
    res.status(200).json({ result: "Error processing callback" });
  }
};

// @desc    Verify a Stripe payment
// @route   POST /api/payments/stripe/verify
// @access  Public
const verifyStripePayment = async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    res.status(200).json({
      verified: paymentIntent.status === 'succeeded',
      status: paymentIntent.status
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get M-Pesa OAuth token
const getMpesaAuthToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');
    
    const response = await axios.get(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    logger.error(`M-Pesa auth error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  processStripePayment,
  processPayPalPayment,
  processMpesaPayment,
  handleMpesaCallback,
  verifyStripePayment
};
