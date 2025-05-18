// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

import backgroundVideo from '../assets/ASTM-MAIN-VIDEO-INTRO.mp4';
import dove from '../assets/Group 8.png';
import themeImage1 from '../assets/Rectangle 9.png';
import themeImage2 from '../assets/Rectangle 11.png';
import themeImage3 from '../assets/Rectangle 13.png';

export default function OurPillars() {
  return (
    <div id="our-pillars" className="w-screen bg-[#40B4E7] relative z-0 pt-40 pb-16">
      {/* Video Player */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 z-10">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <video 
            controls 
            autoPlay 
            muted 
            loop 
            className="w-full h-[32rem] object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Content Below Video */}
      <div className="max-w-5xl mx-auto px-4 mt-52">
        <div className="flex justify-center mt-6 mb-6">
          <img src={dove} alt="Dove with leaf" className="w-12 h-12 object-contain" />
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-2">Our Pillars</h2>
          <div className="w-[120px] h-[2px] bg-white mx-auto"></div>
        </motion.div>

        <div className="space-y-12 text-white">
          {/* Theme 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
          >
            <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
              <img src={themeImage1} alt="Healing on the Margins" className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
              <h3 className="text-xl font-bold mb-3">
                1. Healing on the Margins: Community-Led Solutions to Substance Use
              </h3>
              <p className="text-sm">
                Focus: Centering the voices and expertise of those working directly with 
                vulnerable populations, including street-connected individuals, to address 
                substance abuse through practical, localized interventions.
              </p>
            </div>
          </motion.div>

          {/* Theme 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
          >
            <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
              <h3 className="text-xl font-bold mb-3">
                2. Bridging Gaps: Collaboration, Care, & Change in Street Medicine
              </h3>
              <p className="text-sm">
                Focus: Encouraging cross-sector collaboration among healthcare providers, 
                social workers, and grassroots organizations to build integrated, holistic 
                approaches to families and communities affected by alcohol addiction and drug abuse. 
              </p>
            </div>
            <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
              <img src={themeImage2} alt="Bridging Gaps" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Theme 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
          >
            <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
              <img src={themeImage3} alt="Resilience and Recovery" className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
              <h3 className="text-xl font-bold mb-3">
                3. Resilience and Recovery: Reimagining Health for Vulnerable Communities
              </h3>
              <p className="text-sm">
                Focus: Highlighting the strength and potential of marginalized groups 
                while exploring innovative, culturally rooted recovery and mental health 
                strategies for in African contexts. 
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
