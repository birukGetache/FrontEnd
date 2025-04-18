import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Church, Fish, Droplet, Calendar } from 'lucide-react';

const lakeTanaData = {
  history: [
    {
      period: 'Early Formation',
      details: 'Formed ~5 million years ago by volcanic activity, blocking rivers in the Pleistocene epoch.',
    },
    {
      period: 'Middle Ages',
      details: 'Monasteries built on islands like Debre Maryam and Tana Qirqos, housing religious artifacts.',
    },
    {
      period: '16th-17th Century',
      details: 'Visited by Portuguese Jesuits; treasures of Ethiopian emperors preserved on islands.',
    },
    {
      period: '18th Century',
      details: 'James Bruce documented 45 islands, noting their cultural significance.',
    },
    {
      period: '2015',
      details: 'Nominated as a UNESCO Biosphere Reserve for its natural and cultural importance.',
    },
  ],
  description: {
    overview:
      'Lake Tana, Ethiopia’s largest lake, spans ~3,673 km² and is the source of the Blue Nile River. Located near Bahir Dar, it’s a natural wonder steeped in history and biodiversity.',
    highlights: [
      {
        title: 'Historic Monasteries',
        icon: Church,
        text: 'Home to 37 islands with ancient monasteries like Ura Kidane Mehret, dating back to the 14th century.',
      },
      {
        title: 'Unique Wildlife',
        icon: Fish,
        text: 'Supports 27 fish species, 20 endemic, and over 230 bird species, including pelicans and African fish eagles.',
      },
      {
        title: 'Blue Nile Source',
        icon: Droplet,
        text: 'The lake feeds the Blue Nile, with Tisisat Falls near Bahir Dar creating a spectacular sight.',
      },
    ],
  },
};

const TanaHistoryPage = () => {
  return (
    <div className="flex flex-col sm:mx-20 overflow-hidden">

      <motion.section
        className=" w-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">About Lake Tana</h2>
        <p className="text-gray-700 mb-8 leading-relaxed text-base sm:text-lg">
          {lakeTanaData.description.overview}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-20 px-4 sm:px-8">
  <AnimatePresence>
    {lakeTanaData.description.highlights.map((highlight, index) => (
      <motion.div
        key={index}
        className="flex flex-col h-auto items-start p-5 bg-white/30 backdrop-blur-md rounded-xl shadow-md hover:bg-white/50 hover:shadow-lg transition-all duration-300 max-w-64"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
        whileHover={{ scale: 1.03 }}
      >
        <highlight.icon className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-blue-800">{highlight.title}</h3>
          <p className="text-gray-600 mt-1">{highlight.text}</p>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>

      </motion.section>
    </div>
  );
};

export default TanaHistoryPage;