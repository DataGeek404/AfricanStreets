import React, { useState } from 'react';
import landscapeImage from '../assets/peeps.jpg';
import mpesaLogo from '../assets/image 1.png';
import paypalLogo from '../assets/paypal.png';
import masterCardLogo from '../assets/OIP.jpg';
import MpesaForm from './MpesaForm';

export function DonationSection({ hideImage = false, className = "" }) {
  const [formData, setFormData] = useState({
    paymentMethod: '',
    phone: '',
    mpesaAmount: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const paymentMethods = [
    { name: 'MPESA', logo: mpesaLogo },
    { name: 'PayPal', logo: paypalLogo },
    { name: 'Stripe', logo: masterCardLogo }
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handlePaymentMethodClick = method => {
    setFormData(f => ({ ...f, paymentMethod: method.name }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const safaricomRegex = /^(?:254|\+254|0)?(7[0-9]{8}|1[0-9]{8})$/;
    if (!safaricomRegex.test(formData.phone)) {
      setMessage("Please enter a valid Safaricom number.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('https://backend-yr3r.onrender.com/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Payment failed');

      setMessage('Payment initiated! Awaiting confirmation...');
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
          <img src={landscapeImage} alt="Community landscape" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`w-full bg-white py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">Support Us</h2>
              <p className="text-lg text-gray-700 max-w-lg">
                Your contribution, big or small, goes directly to supporting mental health and substance use programs in underserved communities.
              </p>
            </div>

            {/* Payment Section */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <p className="text-gray-700 mb-3">Select a payment method</p>
                  <div className="grid grid-cols-3 gap-4">
                    {paymentMethods.map(method => (
                      <div
                        key={method.name}
                        onClick={() => handlePaymentMethodClick(method)}
                        className={`border rounded-md p-3 flex items-center justify-center cursor-pointer transition-all
                          ${formData.paymentMethod === method.name
                            ? 'border-[#41B4E7] bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                          }`}
                      >
                        <img src={method.logo} alt={method.name} className="w-full h-auto max-h-16 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditional Form */}
                {formData.paymentMethod === 'MPESA' && (
                  <MpesaForm
                    phone={formData.phone}
                    amount={formData.mpesaAmount}
                    onChange={handleChange}
                    submitting={submitting}
                  />
                )}

                {/* Feedback Message */}
                {message && <p className="text-center mt-4 text-blue-600 font-semibold">{message}</p>}
              </form>

              {(formData.paymentMethod === 'PayPal' || formData.paymentMethod === 'MasterCard') && (
                <div className="text-center p-6 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-800 font-medium">
                  {formData.paymentMethod} support coming soon. Stay tuned!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
