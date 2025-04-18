import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchForm.css'; // Optional: For additional styling

const SearchForm = () => {
  const [destination, setDestination] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      console.log('Searching for:', destination); // Replace with actual search logic
      setDestination('');
    }
  };

  // Animation variants for the input container
  const containerVariants = {
    idle: { scale: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
    focused: {
      scale: 1.02,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  // Animation for the button
  const buttonVariants = {
    idle: { scale: 1, backgroundColor: '#2563eb' },
    hover: {
      scale: 1.05,
      backgroundColor: '#1d4ed8',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="search-form-container"
      variants={containerVariants}
      animate={isFocused ? 'focused' : 'idle'}
      initial="idle"
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your destination"
            className="search-input"
          />
          <AnimatePresence>
            {destination && (
              <motion.button
                type="submit"
                className="search-button"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <FaSearch />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm;