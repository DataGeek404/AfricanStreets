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
      {/* Video Player with increased height */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 z-10">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <video 
            controls 
            autoPlay 
            muted 
            loop 
            className="w-full h-[32rem] object-cover" // Increased from h-80 to h-[32rem]
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Content below video - Adjusted spacing */}
      <div className="max-w-5xl mx-auto px-4 mt-52"> {/* Increased mt-40 to mt-52 */}
        {/* Dove Image */}
        <div className="flex justify-center mt-6 mb-6">
          <img
            src={dove}
            alt="Dove with leaf"
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Rest of your content remains the same */}
        <div className="space-y-8 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Pillars</h2>
            <div className="w-[120px] h-[2px] bg-white mx-auto"></div>
          </div>

          {/* Theme 1 */}
          <div className="grid md:grid-cols-5 gap-6 items-center ">
            <div className="md:col-span-2 rounded-xl overflow-hidden h-48">
              <img
                src={themeImage1}
                alt="Healing on the Margins"
                className="w-full h-full object-cover"
              />
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
          </div>

          {/* Theme 2 */}
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl order-2 md:order-1 text-[#1D204B]">
              <h3 className="text-xl font-bold mb-3">
                2. Bridging Gaps: Collaboration, Care, & Change in Street Medicine
              </h3>
              <p className="text-sm">
                Focus: Centering the voices and expertise of those working directly with vulnerable populations, including street-connected individuals, to address substance abuse through practical, localized interventions.
              </p>
            </div>
            <div className="md:col-span-2 rounded-xl overflow-hidden h-48 order-1 md:order-2">
              <img
                src={themeImage2}
                alt="Bridging Gaps"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Theme 3 */}
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2 rounded-xl overflow-hidden h-48">
              <img
                src={themeImage3}
                alt="Resilience and Recovery"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
              <h3 className="text-xl font-bold mb-3">
                3. Resilience and Recovery: Reimagining Health for Vulnerable Communities
              </h3>
              <p className="text-sm">
                Focus: Centering the voices and expertise of those working directly with vulnerable populations, including street-connected individuals, to address substance abuse through practical, localized interventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}