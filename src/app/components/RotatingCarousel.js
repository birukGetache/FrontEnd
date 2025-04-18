import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const categories = [
  { label: 'Nature', color: 'bg-green-700' },
  { label: 'Art and culture', color: 'bg-red-700' },
  { label: 'Food and wine', color: 'bg-fuchsia-700' },
  { label: 'Sport', color: 'bg-blue-500' },
  { label: 'Leisure', color: 'bg-blue-800' },
  { label: 'Events', color: 'bg-purple-600' },
];

const RotatingCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const rotateLeft = () => {
    setStartIndex((prev) => (prev + 1) % categories.length);
  };

  const getRotatedCategories = () => {
    return categories.map((_, index) => {
      const rotatedIndex = (startIndex + index) % categories.length;
      return categories[rotatedIndex];
    });
  };

  return (
    <div className="relative w-full h-[300px] bg-white overflow-hidden flex items-center justify-center">
      <button
        onClick={rotateLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800 z-10"
      >
        <FaArrowLeft />
      </button>

      <div className="relative w-full flex justify-center items-center gap-4">
        {getRotatedCategories().map((item, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-500 ease-in-out w-[180px] h-[260px] rounded-2xl text-white font-semibold flex items-end justify-center p-4 shadow-lg ${item.color}`}
            style={{
              transform: `translateX(${i * 200 - 500}px) rotateY(${i === 0 ? 0 : i * 5}deg) scale(${1 - i * 0.1})`,
              zIndex: categories.length - i,
              opacity: i > 4 ? 0 : 1,
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingCarousel;
