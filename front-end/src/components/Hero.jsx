// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OurPillars from "./ImageSlider";
import { WhoWeAre } from "./WhoAreWe";
import { VisionMission } from "./VisionMission";
import { RootedLocally } from "./RootedLocally";
import { Approach } from "./Approach";
import { LaunchSection } from "./Launch";
import { KeynoteSpeakers } from "./Keynote";
import { LivedExperiencesPanel } from "./LiveExperience";
import { PartnersSection } from "./Partner";
import { SupportForm } from "./SupportSection";
import { DonationSection } from "./DonationSection";
import { Footer } from "./Footer";
import { BoardOfDirectors } from "./BoardofDirectors";

export default function Hero() {
  return (
    <>
      <section className="bg-white py-16 px-4 pb-50 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Heading with fade-up animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1D204B] leading-relaxed mb-6"
          >
            We support African communities in tackling harmful substance use,
            strengthening mental health, and building systems of dignity & care for all.
          </motion.h1>

          {/* Animated Button with Gradient Border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mt-6 p-[2px] rounded-full"
            style={{
              background: "conic-gradient(from 90deg, #1D204B 0deg, #40B4E7 90deg, #1D204B 180deg, #40B4E7 270deg, #1D204B 360deg)"
            }}
          >
            <a
              href="/#support"
              className="block px-6 py-3 bg-[#1D204B] text-white font-medium rounded-full hover:opacity-90 transition"
            >
              Support Us
            </a>
          </motion.div>
        </div>
      </section>

      <OurPillars />
      <WhoWeAre />
      <VisionMission />
      <Approach />
      <RootedLocally />
      <LaunchSection />
      <KeynoteSpeakers />
      <LivedExperiencesPanel />
      <BoardOfDirectors />
      <PartnersSection />
      <SupportForm />
      <DonationSection />
      <Footer />
    </>
  );
}
