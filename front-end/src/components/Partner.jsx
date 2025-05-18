import React from 'react';
import akidwa from '../assets/Rectangle 29.png';
import wezesha from '../assets/Rectangle 27.png';
import safety from '../assets/Rectangle 28.png';
import zen from '../assets/Rectangle 40.png';
import freedom from '../assets/Logo 1.png';

export function PartnersSection() {
  const partners = [
    akidwa,
    wezesha,
    safety,
    zen,
    freedom
  ];

  const repeatedPartners = [...partners, ...partners]; // Repeat for seamless loop

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-[#1D204B] text-3xl md:text-4xl font-bold text-center mb-16">
          Our Partners
        </h2>
      </div>

      <div className="slider" style={{ '--width': '200px', '--height': '100px', '--quantity': repeatedPartners.length }}>
        <div className="list">
          {repeatedPartners.map((logo, index) => (
            <div
              className="item"
              key={index}
              style={{ '--position': index + 1 }}
            >
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
