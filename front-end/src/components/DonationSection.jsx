import React, { useState } from 'react';
import landscapeImage from '../assets/peeps.jpg';
import mpesaLogo from '../assets/image 1.png';
import paypalLogo from '../assets/paypal.png';
import stripeLogo from '../assets/image.png';
import masterCardLogo from '../assets/mastercard.png';
import MpesaForm from './MpesaForm';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodClick = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method.name }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    // Validate MPESA number format
    if (formData.paymentMethod === 'MPESA') {
      const safaricomRegex = /^(?:254|\+254|0)?(7[0-9]{8}|1[0-9]{8})$/;
      if (!safaricomRegex.test(formData.phone)) {
        setMessage('Please enter a valid Safaricom number.');
        setSubmitting(false);
        return;
      }
    }

    try {
      const payload = {
        fullName: formData.fullName,
        organization: formData.organization,
        email: formData.email,
        paymentMethod: formData.paymentMethod,
        phone: formData.phone,
        amount: formData.mpesaAmount
      };

      const response = await fetch('https://backend-yr3r.onrender.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }

      const data = await response.json();
      
      setMessage(
        formData.paymentMethod === 'MPESA'
          ? 'STK push sent! Check your phone to complete the payment.'
          : 'Thank you! Your payment method will be supported soon.'
      );

      // Reset form after successful MPESA submission
      if (formData.paymentMethod === 'MPESA') {
        setFormData(prev => ({
          ...prev,
          fullName: '',
          organization: '',
          email: '',
          phone: '',
          mpesaAmount: ''
        }));
      }
    } catch (error) {
      setMessage(error.message || 'Failed to process payment. Please try again.');
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
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">
                Support Our Mission
              </h2>
              <p className="text-lg text-gray-700 max-w-lg">
                Your contribution helps provide mental health resources and
                substance abuse recovery programs to underserved communities.
              </p>
              <div className="mt-4">
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdYEeHhXnoh_XTipw4A-BrZ3W2imrBtk_UdKTOeDaYI97SPiw/viewform?usp=header"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block text-[#41B4E7] font-medium underline hover:text-[#2f9bd2] transition"
  >
    Here is the link to make your Donation
  </a>
</div>

            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields */}
                <div>
                  <label className="block text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                    placeholder="Company Name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Payment methods */}
                <div>
                  <p className="text-gray-700 mb-3">Payment Method</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.name}
                        onClick={() => handlePaymentMethodClick(method)}
                        className={`border rounded-md p-3 flex items-center justify-center cursor-pointer transition-all ${
                          formData.paymentMethod === method.name
                            ? 'border-[#41B4E7] bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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

                {/* MPESA form */}
                {formData.paymentMethod === 'MPESA' && (
                  <MpesaForm
                    phone={formData.phone}
                    amount={formData.mpesaAmount}
                    onChange={handleChange}
                    submitting={submitting}
                  />
                )}

                {/* Coming soon notices */}
                <AnimatePresence>
                  {(formData.paymentMethod === 'PayPal' ||
                    formData.paymentMethod === 'MasterCard' ||
                    formData.paymentMethod === 'Stripe') && (
                    <motion.div
                      key={formData.paymentMethod}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-center p-4 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-800"
                    >
                      {formData.paymentMethod} integration coming soon!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status messages */}
                {message && (
                  <p
                    className={`text-center mt-4 ${
                      message.includes('Failed') || message.includes('invalid')
                        ? 'text-red-600'
                        : 'text-green-600'
                    } font-semibold`}
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#41B4E7] text-white py-3 rounded-md hover:bg-[#3699C7] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Processing...' : 'Donate Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
