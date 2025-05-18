// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import whoWeAreImage from '../assets/4.jpg';

export function WhoWeAre() {
  return (
    <div id="about" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#1D204B] py-12 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center md:justify-start"
          >
            <img
              src={whoWeAreImage}
              alt="Who we are"
              className="h-64 w-80 md:h-72 md:w-96 object-cover rounded-[5%] shadow-lg"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4">Who Are We</h2>
            <p className="text-sm leading-relaxed">
              Africa Street Therapy Medicine (ASTM) is a collaborative initiative tackling 
              illicit alcohol and substance abuse across Kenya and beyond. Launched in 2024 
              under Wezesha, it brings together medical and mental health professionals, NGOs, 
              stakeholders and educators to promote access to preventive mental health and 
              addiction care to the marginalized and vulnerable communities.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
