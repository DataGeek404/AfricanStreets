import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ProfileCard } from './ProfileCard';

export function LivedExperiencesPanel() {
  const panelists = [
    {
      name: "Maryanne M. Karanja",
      roles: [
        "Co-Founder Africa Street Medicine Therapy",
        "Counseling psychologist",
        "Founder; Freedom Lounge\nMusician"
      ],
      points: [
        "Survivors/lived experiences shared personal stories, highlighting the broader family impact of addiction.",
        "Discussed the link between addiction and violence.",
        "Addressed stigma and misinformation surrounding rehabilitation.",
        "Stressed the need for rehabilitation services in prisons.",
        "Advocated for early intervention in schools and community-based solutions."
      ]
    },
    {
      name: "Panelist 2 Name",
      roles: [
        "Panelist 2 Title",
        "Panelist 2 Role",
        "Panelist 2 Additional Role"
      ],
      points: [
        "Point 1",
        "Point 2",
        "Point 3"
      ]
    }
  ];

  return (
    <div className="w-full bg-[#31AC6E] py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Lived experiences panel
        </h2>
      </div>
      <div className="w-full bg-[#31AC6E] py-12 relative">
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.3 }
          }}
          className="!overflow-visible"
        >
          {panelists.map((panelist, index) => (
            <SwiperSlide key={index}>
              <ProfileCard name={panelist.name} roles={panelist.roles} points={panelist.points} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#31AC6E] to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#31AC6E] to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}
