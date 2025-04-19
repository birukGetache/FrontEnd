'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CombinedNavBar = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'Destination', label: 'Destination' },
    { id: 'Magazine', label: 'Magazine' },
    { id: 'Blog', label: 'Blog' },
    { id: 'Faq', label: 'Faq' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScroll = (id) => {
    setActiveSection(id); // Immediately update active section
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000000' : '#ffffff';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScrollUpdate = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Adjust this value as needed
      
      tabs.forEach((tab) => {
        const section = document.getElementById(tab.id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(tab.id);
          }
        }
      });
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const throttledScroll = throttle(handleScrollUpdate, 100);
    window.addEventListener('scroll', throttledScroll);
    
    // Initial check on mount
    handleScrollUpdate();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-gray-900/40 backdrop-blur-lg shadow-md dark:bg-gray-800/10">
      <div className="w-screen px-5 sm:px-20 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="h-12 w-12 bg-[#a86747] rounded-full overflow-hidden relative cursor-pointer"
              onClick={() => handleScroll('home')}
            >
              <Image src="/logo.png" alt="Logo" fill className="object-cover" priority />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2"
            aria-label="Main navigation"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleScroll(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none ${
                  activeSection === tab.id
                    ? 'bg-gray-600 text-white dark:bg-gray-700'
                    : 'hover:bg-gray-200 text-blue-700 dark:hover:bg-gray-700 dark:text-blue-800'
                }`}
              >
                <span className="text-sm font-medium">
                  {t(tab.label)}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" size={20} />
              ) : (
                <FaMoon className="text-gray-300" size={20} />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            ref={navbarRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 pb-4 flex flex-col items-center gap-2"
            aria-label="Mobile navigation"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleScroll(tab.id)}
                className={`w-full text-center py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeSection === tab.id
                    ? 'bg-gray-600 text-white dark:bg-gray-700'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
                }`}
              >
                <span>{t(tab.label)}</span>
              </button>
            ))}

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-full text-center py-3 px-4 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-300 dark:bg-gray-900 dark:hover:bg-gray-800"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="flex items-center justify-center gap-2">
                {darkMode ? (
                  <FaSun className="text-yellow-100" size={20} />
                ) : (
                  <FaMoon size={20} />
                )}
                <span>{darkMode ? t('Light Mode') : t('Dark Mode')}</span>
              </div>
            </button>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default CombinedNavBar;