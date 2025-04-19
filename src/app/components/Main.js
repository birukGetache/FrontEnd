'use client'; 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Slider.css';
import { useRouter } from 'next/navigation';

const Slider = () => { 
  const router = useRouter();
  const [slides] = useState([
    {
      id: 1,
      name: "Lake Tana at Night",
      description: "A stunning nighttime view of Lake Tana, with the city lights reflecting on its calm waters.",
      imageUrl: "/TanaNight.png"
    },
    {
      id: 2,
      name: "Women of Faith",
      description: "Honoring the spiritual devotion of Orthodox nuns and women monastics around Lake Tana, who dedicate their lives to prayer and tradition.",
      imageUrl: "/womenPriest.png"
    },
    {
      id: 3,
      name: "Dek Island",
      description: "One of the largest and most famous islands on Lake Tana, known for its ancient monasteries and peaceful landscapes.",
      imageUrl: "/Dek.png"
    },
    {
      id: 4,
      name: "Bird Watching on Tana",
      description: "Lake Tana is a haven for birdwatchers, featuring a wide variety of native and migratory bird species.",
      imageUrl: "/TanaBird.png"
    },
    {
      id: 5,
      name: "Fishing on Lake Tana",
      description: "Fishing is both a way of life and a peaceful tradition on Lake Tana, offering locals daily connection with the water.",
      imageUrl: "/TanaFish.png"
    },
    {
      id: 6,
      name: "Monasteries of Lake Tana",
      description: "Visit the legendary monasteries of Lake Tana, where sacred manuscripts and icons have been preserved for centuries.",
      imageUrl: "/TanaBible.png"
    },
    {
      id: 7,
      name: "Priests and Church Life",
      description: "Experience the deep-rooted spiritual practices of Orthodox priests, from morning prayers to sacred rituals on Lake Tana's islands.",
      imageUrl: "/priest.png"
    }
  ]);
  
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex]); // Re-run effect when currentIndex changes

  return (
    <div className='relative'>
      <div className="container">
        <div className="slide">
          {slides.map((slide, index) => {
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