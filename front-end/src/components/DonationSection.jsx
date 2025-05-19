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

    // M-PESA number format check
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
        method: formData.paymentMethod,
        phone: formData.phone,
        amount: formData.mpesaAmount
      };

      const res = await fetch('https://backend-yr3r.onrender.com/api', {
        method: 'POST',
        mode: 'cors',
        headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
  withCredentials: false, // This is important for CORS
  timeout: 30000, 
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment failed');

      setMessage(
        formData.paymentMethod === 'MPESA'
          ? 'STK push sent! Check your phone to complete it.'
          : 'Thank you! We will be adding this payment method soon.'
      );
    } catch (err) {
      setMessage(err.message || 'Something went wrong.');
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
            {/* Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">
                Support Us
              </h2>
              <p className="text-lg text-gray-700 max-w-lg">
                Your contribution, big or small, goes directly to supporting
                mental health and substance use programs in underserved
                communities.
              </p>
            </div>

            {/* Form */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-gray-700">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Organization (optional)"
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <p className="text-gray-700 mb-3">
                    Select a payment method
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {paymentMethods.map(method => (
                      <motion.div
                        key={method.name}
                        onClick={() => handlePaymentMethodClick(method)}
                        className={`border rounded-md p-3 flex items-center justify-center cursor-pointer transition-all ${
                          formData.paymentMethod === method.name
                            ? 'border-[#41B4E7] bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                        }`}
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

                {/* MPESA Form */}
                {formData.paymentMethod === 'MPESA' && (
                  <MpesaForm
                    phone={formData.phone}
                    amount={formData.mpesaAmount}
                    onChange={handleChange}
                    submitting={submitting}
                  />
                )}

                {/* Coming Soon */}
                <AnimatePresence>
                  {(formData.paymentMethod === 'PayPal' ||
                    formData.paymentMethod === 'MasterCard' || 
                    formData.paymentMethod === 'Stripe') && (
                    <motion.div
                      key={formData.paymentMethod}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center p-6 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-800 font-medium"
                    >
                      {formData.paymentMethod} support coming soon. Stay
                      tuned!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feedback */}
                {message && (
                  <p className="text-center mt-4 text-blue-600 font-semibold">
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
