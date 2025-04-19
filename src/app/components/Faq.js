// src/components/Faq.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Faq.css';

const Faq = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'You can return any item within 30 days of purchase for a full refund, provided it is in original condition.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you’ll receive a tracking number via email. You can use it on our website to check the status.',
    },
    {
      question: 'How many destinations are there on Lake Tana?',
      answer: 'There are over 20 destinations on Lake Tana, including historic monasteries, islands, and scenic spots.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach us via email at nahom@gmail.com or call us at 0909090909 during business hours.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div
      className="faq-container"
      id="Faq"
      initial={{ scale: 0.2, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl mx-20 sm:text-3xl font-bold text-gray-600 mb-6">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
              <span className="faq-toggle">{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
