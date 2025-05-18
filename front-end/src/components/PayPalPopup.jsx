// PayPalPopup.jsx
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export default function PayPalPopup({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <button onClick={onClose} className="float-right text-gray-500">✕</button>
            <h3 className="text-xl font-bold mb-4">PayPal Checkout</h3>
            {/* TODO: insert PayPal Buttons or iframe here */}
            <p>Integrate PayPal JS SDK here.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
