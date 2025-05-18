import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ProfileCard } from './ProfileCard';

export function KeynoteSpeakers() {
  const speakers = [
    {
      name: "Dr Fiona O'Reilly",
      roles: [
        "Founder of Irish Street Medicine",
        "CEO of SafetyNet Primary Care",
        "Founder of the Irish Street Medicine Symposium"
      ],
      points: [
        "Presented statistics on drug and alcohol use among young people in Ireland.",
        "Emphasized the importance of understanding community-specific problems before designing interventions.",
        "Advocated for community involvement as a critical factor in addressing substance abuse."
      ]
    },
    {
      name: "Dr Salome Mbugua",
      roles: [
        "Co-founder of Street Medicine Africa",
        "UN Mandate Holder, A researcher",
        "CEO Akidwa",
        "Gender Equality Activist and human rights advocate",
        "Appointed to the Irish Human Rights and Equality Commission by President Michael D. Higgins in 2018"
      ],
      points: [
        "Moved by the substance abuse crisis in her village in Kenya reached out to Maryanne Karanja to start an initiative together that will tackle the prevalence of substance abuse in society.",
        "Advocated for action-oriented conversations to address the problem.",
        "Stressed that financial wealth is not a prerequisite for finding solutions."
      ]
    },
    {
      name: "Dr. Andrew Toro",
      roles: [
        "Head of Drug Abuse Commission, Ministry of Health",
        "UN Mandate Holder, A researcher"
      ],
      points: [
        "Stressed the increasing prevalence of drug abuse and the urgent need for intervention.",
        "Highlighted government mandates, including surveillance, public education, and policy enforcement.",
        "Noted ongoing research to better understand the problem.",
        "Shared the government's commitment to mental health services, combating prescription drug abuse, and regulating alcohol and drug marketing",
        "Announced upcoming public awareness campaigns.",
        "Officially launched Street Medicine Africa in partnership with the Ministry of Health."
      ]
    },
    {
      name: "Joyce Igogo",
      roles: [
        "Co-founder, Africa Street Therapy Medicine",
        "Founder, Zen Recovery Centre"
      ],
      points: [
        "Highlighted the prevention-treatment-support approach",
        "Projected  aims reducing drug initiation among high-risk populations, providing evidence-based interventions, and supporting long-term recovery",
      ]
    },
    {
      name: "Dr. Yvonne",
      roles: [
        "Director of Public Education, NACADA",
      ],
      points: [
        "Played a video demonstrating the effects of heroin use.",
        "Highlighted NACADA’s prevention and treatment programs.",
        "Provided alarming statistics on alcohol and drug abuse among children as young as six.",
        "Discussed the increasing issue of online drug sales targeting youth.",
        "Presented various forms of cannabis currently in circulation.",
        "Outlined NACADA’s inpatient and outpatient support groups, including AA/NA and other recovery programs.",
      ]
    },
    {
      name: "Jane W. Ngetha",
      roles: [
        "Chairperson. Wezesha",
      ],
      points: [
        "Emphasized Wezesha Kenya’s focus on supporting women, youth, and children",
        "Addressed the devastating impact of illicit alcohol and drug abuse on safety, poverty levels, and social cohesion.",
        "Highlighted how marginalized groups, particularly women, bear the greatest burden",
        "Stressed the need for a holistic approach combining treatment, prevention, and education.",
      ]
    },
    {
      name: "Emily Mowrio",
      roles: [
        "Founder, CAADA",
      ],
      points: [
        "Shared a personal story of her brother’s struggle with alcohol abuse.",
        "Discussed CAADA’s mission to mitigate the impact of drug and alcohol abuse in communities.",
        " Highlighted the economic impact of illicit brews and drug abuse on productivity.",
        " Promoted community interventions such as volunteering and organizational support.",
      ]
    },

  ];

  return (
    <div className="w-full bg-[#1D204B] py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Key note speakers & speeches
        </h2>
      </div>

      <div className="w-full bg-[#1D204B] py-12 relative">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.3 },
          }}
          className="!overflow-visible"
        >
          {speakers.map((speaker, index) => (
            <SwiperSlide key={index}>
              <ProfileCard
                name={speaker.name}
                roles={speaker.roles}
                points={speaker.points}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows – Styled */}
        <div className="swiper-button-prev !text-white !left-2 z-50"></div>
        <div className="swiper-button-next !text-white !right-2 z-50"></div>

        {/* Gradient overlays – send behind arrows */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1D204B] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1D204B] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
