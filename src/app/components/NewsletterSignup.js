import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', email, confirmEmail);
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-8 rounded-lg shadow-sm text-center   backdrop-blur-md 
    border border-blue-500/40 
    bg-gradient-to-br from-white/25 to-white/10 
    text-blue-600 font-semibold text-sm 
     shadow-black/10"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h2 className="text-xl font-bold text-gray-600 mb-4 uppercase">SIGN UP FOR OUR NEWSLETTER</h2>
      <h3 className="text-lg text-gray-500 mb-6 italic">Continue living like an Italian</h3>
      
      <p className="text-gray-500 leading-relaxed mb-8">
        Subscribe to the Newsletter so as not to miss places,
        events and experiences for experiencing the best side
        of Italy: the authentic one.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col text-left">
          <label htmlFor="email" className="font-bold text-gray-600 mb-2">EMAIL:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter"
            className="p-3 border border-gray-400 rounded text-base"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <input
            type="email"
            id="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm"
            className="p-3 border border-gray-400 rounded text-base"
            required
          />
        </div>
        
        <button
          type="submit"
          className="mt-4 bg-red-600 hover:bg-red-700 text-gray-400 py-3 px-4 rounded uppercase font-bold transition-colors duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </motion.div>
  );
};

export default NewsletterSignup;
