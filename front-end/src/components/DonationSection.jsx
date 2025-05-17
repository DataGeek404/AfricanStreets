import React, { useState } from 'react';
import landscapeImage from '../assets/peeps.jpg';
import mpesaLogo from '../assets/image 1.png';
import paypalLogo from '../assets/paypal.png';
import stripeLogo from '../assets/image.png';

export function DonationSection({ hideImage = false, className = "" }) {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    paymentMethod: ''
  });

  const [mpesaPopup, setMpesaPopup] = useState({
    open: false,
    status: 'form', // 'form' | 'loading' | 'success'
    message: ''
  });

  const [mpesaDetails, setMpesaDetails] = useState({
    mpesaPhone: '',
    mpesaAmount: ''
  });

  const paymentMethods = [
    { 
      name: 'MPESA', 
      logo: mpesaLogo,
      redirectUrl: 'https://mpesa.payment-gateway.com' 
    },
    { 
      name: 'PayPal', 
      logo: paypalLogo,
      redirectUrl: 'https://www.paypal.com/payment' 
    },
    { 
      name: 'Stripe', 
      logo: stripeLogo,
      redirectUrl: 'https://stripe.com/payments' 
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMpesaChange = (e) => {
    const { name, value } = e.target;
    setMpesaDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodClick = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method.name }));
    
    if (method.name === 'MPESA') {
      setMpesaPopup({ open: true, status: 'form', message: '' });
      if (formData.phone) {
        setMpesaDetails(prev => ({ ...prev, mpesaPhone: formData.phone }));
      }
    } else {
      window.open(method.redirectUrl, '_blank');
    }
  };

  const handleMpesaSubmit = async (e) => {
    e.preventDefault();
    setMpesaPopup(prev => ({ ...prev, status: 'loading', message: '' }));
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would call your payment API here
    const paymentSuccess = true; // Simulate success
    
    if (paymentSuccess) {
      setMpesaPopup(prev => ({
        ...prev,
        status: 'success',
        message: 'Payment Successful! Thank you for your support.'
      }));
      
      // Close popup after 3 seconds
      setTimeout(() => {
        setMpesaPopup({ open: false, status: 'form', message: '' });
      }, 3000);
    } else {
      setMpesaPopup(prev => ({
        ...prev,
        status: 'form',
        message: 'Payment failed. Please try again.'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod && formData.paymentMethod !== 'MPESA') {
      const method = paymentMethods.find(m => m.name === formData.paymentMethod);
      if (method) {
        window.open(method.redirectUrl, '_blank');
      }
    }
  };

  return (
    <div id="support" className="relative w-full">
      {/* Top Image */}
      {!hideImage && (
        <div className="w-full h-[35vh] md:h-[50vh] -mt-1">
          <img 
            src={landscapeImage} 
            alt="Community landscape" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* MPESA Payment Popup */}
      {mpesaPopup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-20 p-4 transition-all duration-300">
          <div className={`bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden transition-all duration-300 ${mpesaPopup.status === 'success' ? 'animate-bounce' : ''}`}>
            {/* Close button (only shown when not in success state) */}
            {mpesaPopup.status !== 'success' && (
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-bold text-[#1D204B]">MPESA Payment</h3>
                <button 
                  onClick={() => setMpesaPopup({ open: false, status: 'form', message: '' })}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close MPESA popup"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Loading State */}
            {mpesaPopup.status === 'loading' && (
              <div className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#31AC6E]"></div>
                <p className="text-gray-700">Processing your payment...</p>
              </div>
            )}
            
            {/* Success State */}
            {mpesaPopup.status === 'success' && (
              <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 animate-scaleIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-2xl font-bold text-[#31AC6E]">Success!</h3>
                <p className="text-gray-700 text-lg">{mpesaPopup.message}</p>
                <div className="w-full bg-green-100 h-1 mt-4 overflow-hidden">
                  <div className="bg-green-500 h-full animate-progress"></div>
                </div>
              </div>
            )}
            
            {/* Form State */}
            {mpesaPopup.status === 'form' && (
              <form onSubmit={handleMpesaSubmit} className="p-6 space-y-4">
                {mpesaPopup.message && (
                  <div className="text-red-500 text-sm">{mpesaPopup.message}</div>
                )}
                <div>
                  <label htmlFor="mpesaPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="mpesaPhone"
                    name="mpesaPhone"
                    value={mpesaDetails.mpesaPhone}
                    onChange={handleMpesaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] text-gray-900"
                    placeholder="254712345678"
                    pattern="^254[0-9]{9}$"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mpesaAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (KES)
                  </label>
                  <input
                    type="number"
                    id="mpesaAmount"
                    name="mpesaAmount"
                    value={mpesaDetails.mpesaAmount}
                    onChange={handleMpesaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] text-gray-900"
                    placeholder="500"
                    min="10"
                    step="10"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#31AC6E] text-white py-3 px-4 rounded-md hover:bg-[#2a9a5f] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#31AC6E] focus:ring-offset-2"
                  >
                    Initiate MPESA Payment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rest of your existing content... */}
      <div className={`w-full bg-white py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">
                Support Us
              </h2>
              <p className="text-lg text-gray-700 max-w-lg">
                Your contribution, big or small, goes directly to supporting mental health and substance use programs in underserved communities.
                Help us run mobile clinics, offer psychosocial support, train local health workers, and reach those most in need.
              </p>
            </div>

            {/* Right Form */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Community/Organization Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#41B4E7] focus:border-[#41B4E7] placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 mb-3">Select a payment method</p>
                  <div className="grid grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.name}
                        onClick={() => handlePaymentMethodClick(method)}
                        className={`border rounded-md p-3 flex items-center justify-center cursor-pointer transition-all
                          ${formData.paymentMethod === method.name 
                            ? 'border-[#41B4E7] bg-blue-50 shadow-md' 
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                          }`}
                      >
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img 
                            src={method.logo} 
                            alt={method.name} 
                            className="w-full h-auto max-h-16 object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1D204B] text-white py-3 px-6 rounded-md hover:bg-[#3191c6] transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-[#1D204B] focus:ring-offset-2"
                >
                  Support
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}