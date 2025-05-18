import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import director1 from '../assets/Ellipse 10.png';
import director2 from '../assets/Ellipse 12.png';
import director3 from '../assets/Ellipse 11.png';

export function BoardOfDirectors() {
  const directors = [
    {
      name: "Maryanne M. Karanja",
      bio: "Co-Founder Africa Street Medicine Therapy. Counselling psychologist. Founder of Freedom Lounge. Musician. Marketer.",
      image: director1,
      position: "left"
    },
    {
      name: "Joyce Igogo",
      bio: "Co-Founder, Africa Street Therapy Medicine. Founder of Zen Recovery Centre.",
      image: director2,
      position: "right"
    },
    {
      name: "Dr. Salome Mbugua Henry",
      bio: `Co-founder of Street Medicine Africa. UN Mandate Holder. A researcher, gender equality activist, and human rights advocate. CEO of Akidwa. \nAppointed to the Irish Human Rights and Equality Commission by President Michael D. Higgins in 2018.`,
      image: director3,
      position: "center"
    }
  ];

  const fadeVariants = (direction) => ({
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'center' ? 50 : 0
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8 }
    }
  });

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-[#31AC6E] text-3xl md:text-4xl font-bold text-center mb-16">
          Board of Directors
        </h2>

        <div className="relative min-h-[650px] md:min-h-[550px]">
          {['left', 'right', 'center'].map((position) => (
            <div
              key={position}
              className={`md:absolute ${
                position === 'left'
                  ? 'md:left-0 md:top-0'
                  : position === 'right'
                  ? 'md:right-0 md:top-0'
                  : 'md:left-1/2 md:bottom-0 md:transform md:-translate-x-1/2'
              } w-full md:w-1/3 px-4 mb-12 md:mb-0`}
            >
              {directors
                .filter((d) => d.position === position)
                .map((director, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeVariants(position)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#31AC6E] mb-6">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl text-[#31AC6E] font-bold mb-2 text-center w-full">
                      {director.name}
                    </h3>
                    <p className="text-gray-600 text-base text-justify whitespace-pre-line px-4">
                      {director.bio}
                    </p>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
