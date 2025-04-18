import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sailboat, Fish, Church, Droplet, Landmark, Sprout } from 'lucide-react';
import Image from 'next/image';
const lakeTanaPotentials = {
  intro:
    'Lake Tana, Ethiopia’s largest lake, is a hub of untapped potential, poised to drive sustainable growth through tourism, biodiversity, culture, and renewable resources.',
  highlights: [
    {
      title: 'Eco-Tourism & Recreation',
      icon: Sailboat,
      text: 'With 37 islands, Blue Nile Falls, and vibrant birdlife, Lake Tana can expand eco-tourism via boat tours, cultural festivals, and sustainable lodges, attracting global visitors.',
    },
    {
      title: 'Biodiversity & Fisheries',
      icon: Fish,
      text: 'Home to 27 fish species (20 endemic) and over 230 bird species, the lake offers opportunities for sustainable fishing and conservation-driven tourism.',
    },
    {
      title: 'Cultural Heritage',
      icon: Church,
      text: 'Ancient monasteries on islands like Ura Kidane Mehret, some from the 14th century, position the lake as a global pilgrimage and heritage site, ripe for UNESCO recognition.',
    },
  
  ],
};

const TanaPotentialPage = () => {
  return (
    <div className="min-h-screen  flex flex-col sm:mx-20 lg:flex-row overflow-hidden">
     
      <motion.section
        className="w-full p-6 sm:p-8 lg:p-12 bg-blue-50 flex flex-col rounded-md justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8">Opportunities Await</h2>
        <p className='text-lg sm:text-2xl font-bold text-blue-900 mb-8'> {lakeTanaPotentials.intro}</p>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto  xxl:px-8 py-10">
  <div className="flex flex-col lg:flex-row gap-8 mx-0 px-0 items-start">
    {/* Image Section */}
    <div className="w-full lg:w-1/2 rounded-xl overflow-hidden">
      <Image
        src="/img-1.png"
        alt="Lake Tana"
        width={800}
        height={400}
        className="w-full h-auto object-cover rounded-xl shadow-md"
      />
    </div>

    {/* Highlights Section */}
    <div className="w-full lg:w-1/2 space-y-6">
      <AnimatePresence>
        {lakeTanaPotentials.highlights.map((highlight, index) => (
          <motion.div
            key={index}
            className="flex items-start p-4 sm:p-5 bg-white/30 backdrop-blur-md rounded-xl shadow-md hover:bg-white/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <highlight.icon className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                {highlight.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                {highlight.text}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
</div>

</div>

      </motion.section>
    </div>
  );
};

export default TanaPotentialPage;