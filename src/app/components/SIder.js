import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const App = () => {
  const slides = [
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',
    '/7.png'
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Flower Gallery</h1>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]} // ✅ Swiper v10+ way
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="relative"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="w-80 h-96 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}

          {/* Custom navigation + pagination */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <div className="swiper-button-prev bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-pagination !relative !w-auto"></div>
            <div className="swiper-button-next bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default App;
