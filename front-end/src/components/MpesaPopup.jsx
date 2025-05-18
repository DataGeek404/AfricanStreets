import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export function MpesaPopup({ isOpen, status, message, onClose, onSubmit, details, onChange }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {status !== 'success' && (
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-bold text-[#1D204B]">MPESA Payment</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
            )}

            {/* Loading */}
            {status === 'loading' && (
              <div className="p-8 flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#31AC6E]"></div>
                <p className="text-gray-700">Processing your payment...</p>
              </div>
            )}

            {/* Success */}
            {status === 'success' && (
              <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-2xl font-bold text-[#31AC6E]">Success!</h3>
                <p className="text-gray-700 text-lg">{message}</p>
              </div>
            )}

            {/* Form */}
            {status === 'form' && (
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                {message && <p className="text-red-500 text-sm">{message}</p>}

                <div>
                  <label className="block mb-1 text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="mpesaPhone"
                    value={details.mpesaPhone}
                    onChange={onChange}
                    placeholder="254712345678"
                    pattern="^254[0-9]{9}$"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Amount (KES)</label>
                  <input
                    type="number"
                    name="mpesaAmount"
                    value={details.mpesaAmount}
                    onChange={onChange}
                    placeholder="500"
                    min="10"
                    step="10"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#31AC6E] text-white py-3 rounded-md hover:bg-[#2a9a5f] transition-colors"
                >
                  Initiate MPESA Payment
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
