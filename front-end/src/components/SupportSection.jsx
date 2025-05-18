import React, { useState, useRef } from 'react';
import backgroundImage from '../assets/blaah.png';
import { CalendarIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion';

export function SupportForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    supportType: '',
    timeframe: null,
    description: ''
  });

  const supportTypes = ['PREVENTIVE', 'SUPPORTIVE', 'TREATMENT', 'TRAINING'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, timeframe: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Framer Motion scroll animation setup
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true });
  const isRightInView = useInView(rightRef, { once: true });

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div
      id="join"
      className="w-full bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left Text Content */}
        <motion.div
          ref={leftRef}
          variants={fadeLeft}
          initial="hidden"
          animate={isLeftInView ? 'visible' : 'hidden'}
          className="text-white max-w-lg flex flex-col justify-center items-start min-h-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Be Part of the Change
          </h2>
          <p className="text-lg md:text-xl drop-shadow-md">
            We believe in solutions built hand-in-hand with communities. Your collaboration can help us reach further and go deeper.
          </p>
        </motion.div>

        {/* Right Form */}
        <motion.div
          ref={rightRef}
          variants={fadeRight}
          initial="hidden"
          animate={isRightInView ? 'visible' : 'hidden'}
          className="bg-white text-[#1D204B] p-8 rounded-xl shadow-2xl w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Get Involved</h3>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />

            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Community/Organization Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <select
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900"
              required
            >
              <option value="" disabled>What kind of support do you need?</option>
              {supportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <div className="relative">
              <DatePicker
                selected={formData.timeframe}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Preferred timeframe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md pr-10 text-gray-900"
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your needs"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#1D204B] text-white py-3 px-6 rounded-md hover:bg-[#3191c6] transition-colors text-lg font-medium"
            >
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
