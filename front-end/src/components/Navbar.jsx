// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import weblogo from '../assets/image4.png';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* This spacer div creates space for the fixed navbar so content doesn't get hidden behind it */}
      <div className="h-24 md:h-20"></div>
      
      <div className="fixed w-full top-0 left-0 z-50 px-4 pt-5">
        <div className="max-w-screen-xl mx-auto">
          {/* Main Nav Container - Added rounded-full and shadow for pill shape */}
          <nav className="w-full px-6 py-2 bg-gradient-to-r from-[#1D204B] to-[#41B4E7] background-blur-md text-white flex justify-between items-center rounded-full shadow-lg transition-all duration-300">
            {/* Logo - with left padding */}
            <div className="flex items-center gap-2 pl-4">
              <img src={weblogo} alt="Logo" className="h-10 w-auto" />
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8 text-sm font-medium">
                <li><a href="/#our-pillars" className="text-white hover:opacity-80 transition">Our Pillars</a></li>
                <li><a href="/#about" className="text-white hover:opacity-80 transition">About Us</a></li>
                <li><a href="/#approach" className="text-white hover:opacity-80 transition">Approach</a></li>
                <li><a href="/#launch" className="text-white hover:opacity-80 transition">Launch</a></li>
                <li><a href="/#join" className="text-white hover:opacity-80 transition">Join Us</a></li>
              </ul>
            </div>

            {/* Support Us Button - with right padding */}
            <div className="hidden md:block pr-4">
              <a 
                href="/#support" 
                className="px-6 py-2 bg-[#1D204B] text-white font-medium rounded-full border-2 border-white hover:bg-[#2a2e6b] transition"
              >
                Support Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu - Now appears below the pill-shaped nav */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-gradient-to-b from-[#1D204B] to-[#41B4E7] px-8 py-4 mt-2 rounded-lg shadow-lg"
              >
                <ul className="flex flex-col space-y-4 text-sm font-medium">
                  <li><a href="/#about" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
                  <li><a href="/#our-pillars" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>Our Pillars</a></li>
                  <li><a href="/#approach" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>Approach</a></li>
                  <li><a href="/#launch" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>Launch</a></li>
                  <li><a href="/#join" className="text-white block py-2" onClick={() => setIsMenuOpen(false)}>Join Us</a></li>
                  <li>
                    <a
                      href="/#support"
                      className="block w-full text-center px-6 py-2 bg-[#1D204B] text-white font-medium rounded-full border-2 border-white mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Support Us
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}