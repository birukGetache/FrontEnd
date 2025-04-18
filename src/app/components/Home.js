import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './WaterFlow';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* p5.js Water Flow Animation */}
      <div className="absolute inset-0 z-0">
        <P5Wrapper sketch={sketch} />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-lakeBlue/50 to-transparent z-10"></div>
      {/* Content */}
      <div className="relative z-20 text-white px-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg"
        >
          Discover <span className="text-ripple">React Lake</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          A breathtaking platform where creativity meets code, blending React and p5.js for immersive learning.
        </motion.p>
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-block bg-ripple hover:bg-blue-200 text-lakeBlue font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Explore Now
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;