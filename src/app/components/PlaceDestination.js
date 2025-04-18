"use client";
import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import styled from 'styled-components';
import '../i18n';

const Destination = ({ setDestnation, setVisibleCardId }) => {
  const { t, i18n } = useTranslation();
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const initialDestinationsToShow = 8;
  const destinationsToShow = showAllDestinations
    ? filteredDestinations
    : filteredDestinations.slice(0, initialDestinationsToShow);

  const BookButton = styled(motion.button)`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    backdrop-filter: blur(6px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: #2563eb;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.3s ease-in-out;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1);
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0%;
      height: 100%;
      background-color: #111827;
      transition: width 0.4s ease-in-out;
      z-index: 0;
    }

    &:hover::before {
      width: 100%;
      left: 0;
      right: auto;
    }

    &:hover {
      color: white;
      border-color: rgba(59, 130, 246, 0.6);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }

    & > * {
      position: relative;
      z-index: 1;
    }
  `;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://tankwaaddis.onrender.com/destinations');
        const data = await response.json();
        setFilteredDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  return (
    <div className="mt-0 pt-0" id="Destination">
      <motion.h1 
        className="text-gray-500 text-start text-4xl ml-32 capitalize"
        initial="hidden"
        whileInView="visible"
        variants={titleVariants}
        viewport={{ once: true, margin: "-50px" }}
      >
        {t('destinationTitle')}
      </motion.h1>

      <ResponsiveMasonry
        columnsCountBreakPoints={{
          0: 1,
          768: 2,
          1024: 3,
        }}
        className="w-[87vw] mx-auto py-8"
      >
        <Masonry gutter="24px">
          {destinationsToShow.map((destination, index) => (
            <motion.div
              key={destination._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col h-full rounded-xl  hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden 
               backdrop-blur-md 
    border border-blue-500/40 
    bg-gradient-to-br from-white/25 to-white/10 
    text-blue-600 font-semibold text-sm 
    shadow-md shadow-black/10 "
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Image - Fixed aspect ratio */}
              <motion.div 
                className="w-[85%] mx-auto mt-5 aspect-video"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <img
                  src={destination.image || '/fallback-image.jpg'}
                  alt={destination.titles[i18n.language]}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </motion.div>

              {/* Content */}
              <div className="p-4 flex flex-col">
                <motion.div 
                  className="flex items-start gap-2 mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <FaMapMarkerAlt className="text-gray-400 mt-1" size={18} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {destination.titles[i18n.language]}
                    </h3>
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-4 min-h-[60px] max-h-[120px] overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-gray-600 line-clamp-4">
                    {destination.descriptions[i18n.language]}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <BookButton
                    onClick={() => {
                      setDestnation(destination);
                      setVisibleCardId(destination._id);
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm bg-gray-900 mt-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCalendarCheck size={16} />
                    <span>Book Now</span>
                  </BookButton>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Destination;