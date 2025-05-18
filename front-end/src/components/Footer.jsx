import React from 'react';
import logo from '../assets/image4.png';
import instagram from '../assets/Group.png';
import youtube from '../assets/youtube-icon.png';
import bird from '../assets/Group 7.png';

export function Footer() {
  const handleCopyEmail = () => {
    const email = 'info@streettherapymedicine.africa';
    navigator.clipboard.writeText(email).then(() => {
      alert('Email address copied to clipboard!');
    });
  };

  return (
    <footer className="bg-[#1D204B] text-white relative pt-20 pb-8">
      {/* Decorative Bird */}
      <img
        src={bird}
        alt="Bird"
        className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-44 opacity-20 pointer-events-none"
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 md:gap-20 relative z-10 text-center md:text-left">
        {/* Logo */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img src={logo} alt="Africa Street Therapy Medicine" className="h-20 mx-auto md:mx-0" />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-white/30 h-24" />

        {/* Contact & Community */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 w-full justify-between">
          {/* Contact Us */}
          <div className="cursor-pointer" onClick={handleCopyEmail}>
            <h4 className="font-semibold text-xl mb-2">Contact Us</h4>
            <div className="text-base leading-relaxed">
              <p>
                <a
                  href="mailto:info@streettherapymedicine.africa"
                  className="underline hover:text-white"
                >
                  info@streettherapymedicine.africa
                </a>
              </p>
              <p>
                <a
                  href="mailto:streetmedicineafrica@gmail.com"
                  className="underline hover:text-white"
                >
                  streetmedicineafrica@gmail.com
                </a>
              </p>
              <p className="no-underline mt-1">+254 715 686 551</p>
            </div>
          </div>

          {/* Join Community */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-semibold text-xl mb-3">Join the Community</h4>
            <div className="flex items-center gap-5">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <img src={youtube} alt="YouTube" className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <img src={instagram} alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full max-w-4xl border-t border-white/20 mx-auto mt-12"></div>

      {/* Footer Bottom Text */}
      <div className="text-sm text-center text-white/60 mt-5 px-4">
        <p>
          2025 &nbsp; | &nbsp; All rights reserved &nbsp; | &nbsp;
          <a href="#" className="underline hover:text-white">Policies</a> &nbsp; | &nbsp;
          <a href="#" className="underline hover:text-white">Delivery Policy</a>
        </p>
      </div>
    </footer>
  );
}
