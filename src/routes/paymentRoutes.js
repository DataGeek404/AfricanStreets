
const express = require('express');
const router = express.Router();
const { 
  processStripePayment, 
  processPayPalPayment, 
  processMpesaPayment,
  handleMpesaCallback,
  verifyStripePayment
} = require('../controllers/paymentController');
const { body } = require('express-validator');

/**
 * @swagger
 * /api/payments/stripe:
 *   post:
 *     summary: Process a Stripe payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.00
 *               currency:
 *                 type: string
 *                 example: usd
 *               description:
 *                 type: string
 *                 example: Donation to ASTM
 *               donorInfo:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *                   isAnonymous:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post(
  '/stripe', 
  [
    body('amount').isNumeric().withMessage('Amount must be a number')
  ],
  processStripePayment
);

/**
 * @swagger
 * /api/payments/stripe/verify:
 *   post:
 *     summary: Verify a Stripe payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *                 example: pi_12345
 *     responses:
 *       200:
 *         description: Payment verified
 *       400:
 *         description: Invalid payment ID
 *       500:
 *         description: Server error
 */
router.post(
  '/stripe/verify',
  [
    body('paymentId').notEmpty().withMessage('Payment ID is required')
  ],
  verifyStripePayment
);

/**
 * @swagger
 * /api/payments/paypal:
 *   post:
 *     summary: Process a PayPal payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.00
 *               currency:
 *                 type: string
 *                 example: USD
 *               description:
 *                 type: string
 *                 example: Donation to ASTM
 *               donorInfo:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *     responses:
 *       200:
 *         description: PayPal order created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post(
  '/paypal',
  [
    body('amount').isNumeric().withMessage('Amount must be a number')
  ],
  processPayPalPayment
);

/**
 * @swagger
 * /api/payments/mpesa:
 *   post:
 *     summary: Process an M-Pesa payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - amount
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: +254712345678
 *               amount:
 *                 type: number
 *                 example: 500
 *               accountReference:
 *                 type: string
 *                 example: ASTM Donation
 *               transactionDesc:
 *                 type: string
 *                 example: Donation to ASTM
 *     responses:
 *       200:
 *         description: M-Pesa STK push initiated successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post(
  '/mpesa',
  [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?\d{10,15}$/)
      .withMessage('Invalid phone number format'),
    body('amount')
      .isNumeric()
      .withMessage('Amount must be a number')
      .isInt({ min: 1 })
      .withMessage('Amount must be at least 1')
  ],
  processMpesaPayment
);

/**
 * @swagger
 * /api/payments/mpesa/callback:
 *   post:
 *     summary: M-Pesa callback endpoint
 *     tags: [Payments]
 *     description: This endpoint receives callbacks from M-Pesa after payment processing
 *     responses:
 *       200:
 *         description: Callback processed
 */
router.post('/mpesa/callback', handleMpesaCallback);

module.exports = router;
