import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Info, Users, Phone } from 'lucide-react';
import { FaEnvelope, FaTelegram } from 'react-icons/fa';

const TanaFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding & Intro */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 text-blue-300 mr-2" />
              <h3 className="text-2xl font-bold">Lake Tana</h3>
            </div>
            <p className="text-blue-200 text-sm text-center md:text-left">
              Discover the wealth of Ethiopia's largest lake—cultural heritage, natural beauty, and boundless potential.
            </p>
          </motion.div>

          {/* Quick Info Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Info</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start">
                <Clock className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Open daily from 8:00 AM to 6:00 PM</span>
              </li>
              <li className="flex items-start">
                <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Guided tours available in multiple languages</span>
              </li>
              <li className="flex items-start">
                <Users className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Group discounts for 10+ visitors</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Signup & Social Media */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <form className="flex w-full max-w-xs mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-full bg-white/20 text-white placeholder-blue-300 focus:outline-none"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded-r-full hover:bg-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </form>
            
            <div className="flex space-x-4 justify-center items-center">
              <motion.a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                href="tel:+251123456789"
                className="text-blue-200 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <Phone className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaTelegram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:info@laketana.org"
                className="text-blue-200 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaEnvelope className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-blue-600/50 text-center text-sm text-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} Lake Tana. All rights reserved.</p>
          <p className="mt-2">
            Designed with <span className="text-red-300">♥</span> for Ethiopia's heritage.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default TanaFooter;