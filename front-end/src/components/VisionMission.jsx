// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import visionImage from '../assets/IMG_9307.jpg';
import missionImage from '../assets/IMG_9282.jpg';

export function VisionMission() {
  return (
    <div className="w-full bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Top Section - Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-40 items-center"
        >
          {/* Content - Left */}
          <div className="flex flex-col justify-center md:pr-6">
            <h3 className="text-[50px] md:text-[70px] lg:text-[100px] font-bold text-[#31AC6E] leading-[0.85] mb-10">
              Our Vision
            </h3>
            <p className="text-md text-[#1D204B] max-w-[500px]">
              Where empowered African communities lead the response to substance abuse, 
              ensuring dignity, health, and support for all especially the most vulnerable.
            </p>
          </div>

          {/* Image - Right */}
          <div className="w-full rounded-[10%] overflow-hidden shadow-lg">
            <img
              src={visionImage}
              alt="Our Vision illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Bottom Section - Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Image - Left */}
          <div className="w-full rounded-[10%] overflow-hidden shadow-lg">
            <img
              src={missionImage}
              alt="Our Mission in action"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Content - Right */}
          <div className="flex flex-col justify-center md:pl-6">
            <h3 className="text-[50px] md:text-[60px] lg:text-[80px] font-bold text-[#31AC6E] leading-[0.85] mb-10">
              Our Mission
            </h3>
            <p className="text-md text-[#1D204B] max-w-[500px]">
              Street Medicine Therapy Africa brings together frontline professionals and 
              communities to share practical knowledge and strategies for addressing 
              substance use and related health issues.
              <br /><br />
              We support locally driven solutions through inclusive dialogue, training, 
              and partnerships that strengthen care for vulnerable populations in our 
              society.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
