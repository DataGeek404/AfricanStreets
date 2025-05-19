/* eslint-disable no-undef */
import React, { useState } from 'react';
import landscapeImage from '../assets/peeps.jpg';
import mpesaLogo from '../assets/image 1.png';
import paypalLogo from '../assets/paypal.png';
import stripeLogo from '../assets/image.png';
import masterCardLogo from '../assets/mastercard.png';
import MpesaForm from './MpesaForm';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export function DonationSection({ hideImage = false, className = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    paymentMethod: '',
    mpesaAmount: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const paymentMethods = [
    { name: 'MPESA', logo: mpesaLogo },
    { name: 'PayPal', logo: paypalLogo },
    { name: 'MasterCard', logo: masterCardLogo },
    { name: 'Stripe', logo: stripeLogo }
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handlePaymentMethodClick = method => {
    setFormData(f => ({ ...f, paymentMethod: method.name }));
    setMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    // Validate required fields
    if (!formData.fullName || !formData.email) {
      setMessage('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    // M-PESA specific validation
    if (formData.paymentMethod === 'MPESA') {
      const safaricomRegex = /^(?:254|\+254|0)?(7[0-9]{8}|1[0-9]{8})$/;
      if (!safaricomRegex.test(formData.phone)) {
        setMessage('Please enter a valid Safaricom number.');
        setSubmitting(false);
        return;
      }
      if (!formData.mpesaAmount || isNaN(formData.mpesaAmount)) {
        setMessage('Please enter a valid donation amount');
        setSubmitting(false);
        return;
      }
    }

    // Check backend URL is configured
    if (!process.env.NEXT_PUBLIC_APP_BACKEND_URL_API) {
      setMessage('Payment service is currently unavailable. Please try again later.');
      console.error('Backend URL not configured. Check your .env file.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        fullName: formData.fullName,
        organization: formData.organization,
        email: formData.email,
        method: formData.paymentMethod,
        phone: formData.phone,
        amount: formData.mpesaAmount
      };

      const response = await fetch(process.env.REACT_APP_BACKEND_URL_API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Payment failed with status ${response.status}`);
      }

     // const data = await response.json();
      
      setMessage(
        formData.paymentMethod === 'MPESA'
          ? 'STK push sent! Check your phone to complete the payment.'
          : `Thank you for your support! ${formData.paymentMethod} integration coming soon.`
      );

      // Reset form after successful submission (except for payment method)
      setFormData({
        ...formData,
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        mpesaAmount: ''
      });
    } catch (err) {
      console.error('Payment submission error:', err);
      setMessage(err.message || 'An error occurred while processing your payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="support" className="relative w-full">
      {!hideImage && (
        <div className="w-full h-[35vh] md:h-[50vh] -mt-1">
          <img
            src={landscapeImage}
            alt="Community landscape"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={`w-full bg-white py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">
                Support Our Cause
              </h2>
              <p className="text-lg text-gray-700 max-w-lg">
                Your generous donation helps us provide mental health and substance use 
                programs to underserved communities. Every contribution makes a difference.
              </p>
              <div className="pt-4">
                <h3 className="font-semibold text-gray-800">Why donate?</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
                  <li>Direct impact on community programs</li>
                  <li>Tax-deductible donations</li>
                  <li>Transparent fund allocation</li>
                </ul>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="pt-2">
                  <p className="text-gray-700 mb-3 font-medium">Select Payment Method *</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {paymentMethods.map(method => (
                      <motion.div
                        key={method.name}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePaymentMethodClick(method)}
                        className={`border-2 rounded-lg p-3 flex items-center justify-center cursor-pointer transition-all ${
                          formData.paymentMethod === method.name
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ minWidth: '100px' }}
                      >
                        <img
                          src={method.logo}
                          alt={method.name}
                          className="w-16 h-10 object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Payment Method Specific Forms */}
                {formData.paymentMethod === 'MPESA' && (
                  <MpesaForm
                    phone={formData.phone}
                    amount={formData.mpesaAmount}
                    onChange={handleChange}
                    submitting={submitting}
                  />
                )}

                {/* Coming Soon Notices */}
                <AnimatePresence>
                  {(formData.paymentMethod === 'PayPal' ||
                    formData.paymentMethod === 'MasterCard' || 
                    formData.paymentMethod === 'Stripe') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800"
                    >
                      <p className="font-medium">
                        {formData.paymentMethod} integration is coming soon!
                      </p>
                      <p className="text-sm mt-1">
                        We're working to add this payment option. In the meantime, 
                        please consider using MPESA.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !formData.paymentMethod}
                    className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                      submitting || !formData.paymentMethod
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {submitting ? 'Processing...' : 'Donate Now'}
                  </button>
                </div>

                {/* Status Messages */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center p-3 rounded-md font-medium ${
                      message.includes('Thank you') || message.includes('STK push')
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}