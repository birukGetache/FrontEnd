'use client'; 
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Slider.css'; // We'll move the CSS to a separate file
import { useRouter } from 'next/navigation';
const Slider = () => { 
   const router = useRouter();
  const [slides] = useState([
    {
      id: 3,
      name: "Tana in the night",
      description: "A beautiful view of Tana during the night with vibrant city lights.",
      imageUrl: "/TanaNight.png"
    },
    {
      id: 1,
      name: "Tana Duck",
      description: "A serene image of a duck on the calm waters of Tana Lake.",
      imageUrl: "/TanaDuck.png"
    },
    {
      id: 2,
      name: "Dek island",
      description: "A tranquil spot on Dek Island, offering a peaceful escape.",
      imageUrl: "/Dek.png"
    },
    {
      id: 4,
      name: "Harer",
      description: "The historic city of Harer, known for its ancient architecture and rich culture.",
      imageUrl: "/TanaBird.png"
    },
    {
      id: 5,
      name: "Dire",
      description: "Dire, a picturesque location with breathtaking landscapes and serenity.",
      imageUrl: "/TanaFish.png"
    },
    {
      id: 6,
      name: "Biruk",
      description: "Biruk, a place of spiritual significance and peace.",
      imageUrl: "TanaBible.png"
    },
    {
      id: 7, // Fixed duplicate id (originally two "id: 6")
      name: "Biruk",
      description: "Biruk, a place of spiritual significance and peace, symbolizing strength.",
      imageUrl: "DegaEstifanos.jpg"
    }
  ]);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className='relative'>
    <div className="container">
      <div className="slide">
        {slides.map((slide, index) => {
          // Calculate position class
          let positionClass = '';
          if (index === currentIndex) {
            positionClass = 'active';
          } else if (index === (currentIndex + 1) % slides.length) {
            positionClass = 'next';
          } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            positionClass = 'prev';
          } else if (
            index === (currentIndex + 2) % slides.length ||
            index === (currentIndex - 2 + slides.length) % slides.length
          ) {
            positionClass = 'far';
          } else {
            positionClass = 'hidden';
          }

          return (
            <div
              key={slide.id}
              className={`item ${positionClass}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="content">
                <div className="name">{slide.name}</div>
                <div className="des">{slide.description}</div>
                <button
      onClick={() => router.push('/gallery')}
      className="
        px-6 py-3 
        bg-gray-600 hover:bg-gray-700 
        text-white font-medium 
        rounded-lg 
        transition-colors duration-300
        shadow-md hover:shadow-lg
        transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
      "
    >
      See More
    </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="button">
        <button className="prev" onClick={prevSlide}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="next" onClick={nextSlide}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default Slider;