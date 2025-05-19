import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function MpesaForm({ phone, amount, onChange, submitting }) {
  return (
    <motion.div
      className="space-y-4 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="block text-gray-700">MPESA Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={onChange}
          required
          placeholder="07XXXXXXXX"
          className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring focus:border-[#41B4E7]"
        />
      </div>
      <div>
        <label className="block text-gray-700">Amount (KES)</label>
        <input
          type="number"
          name="mpesaAmount"
          value={amount}
          onChange={onChange}
          required
          placeholder="Amount in KES"
          className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring focus:border-[#41B4E7]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#1D204B] text-white py-3 px-6 rounded-md hover:bg-[#3191c6] transition-colors font-medium text-lg"
      >
        {submitting ? 'Processing...' : 'Support'}
      </button>
    </motion.div>
  );
}
