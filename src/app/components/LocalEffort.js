import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sailboat, Fish, Sprout, Droplet, Church } from 'lucide-react';
import Image from "next/image"
const lakeTanaActivities = {
  intro:
    'Lake Tana thrives through the vibrant efforts of local communities, who are tapping into its rich potential with tourism, fishing, conservation, and cultural preservation, paving the way for sustainable growth.',
  efforts: [
    {
      title: 'Boat Tours & Eco-Tourism',
      icon: Sailboat,
      text: 'Local operators in Bahir Dar run daily boat tours to island monasteries and Blue Nile Falls, attracting tourists while promoting eco-friendly practices.',
    },
    {
      title: 'Sustainable Fisheries',
      icon: Fish,
      text: 'Fishers harvest Nile tilapia and endemic barbs, with cooperatives exploring sustainable methods to boost yields and protect biodiversity.',
    },
    {
      title: 'Cultural Preservation',
      icon: Church,
      text: 'Island communities maintain ancient monasteries, sharing their heritage with visitors and preserving artifacts for future generations.',
    },
    // {
    //   title: 'Conservation Efforts',
    //   icon: Sprout,
    //   text: 'Locals collaborate with organizations to remove invasive water hyacinth, protecting the lake’s ecosystem and fisheries.',
    // },
    // {
    //   title: 'Community Development',
    //   icon: Droplet,
    //   text: 'Craft markets and cooperatives in Bahir Dar empower locals, with training programs fostering tourism and sustainable livelihoods.',
    // },
  ],
};

const TanaActivitiesPage = ({id}) => {
  return (
    <div className="min-h-screen sm:mx-20 flex flex-col lg:flex-row overflow-hidden" id={id}>
    

      {/* Right Side: Current Activities with Icons */}
      <motion.section
        className=" w-full p-6 sm:p-8 lg:p-12 rounded-md bg-blue-50 flex flex-col justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8">Local Efforts & Potentials</h2>
        <p className="text-lg  font-bold text-blue-900 mb-8"> {lakeTanaActivities.intro}</p>
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-6 lg:space-y-0 max-w-5xl mx-auto">
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

  {/* Text/Animated Cards Section */}
  <div className="w-full lg:w-1/2 space-y-6">
    <AnimatePresence>
      {lakeTanaActivities.efforts.map((effort, index) => (
        <motion.div
          key={index}
          className="flex items-start p-5 bg-white/30 backdrop-blur-md rounded-xl shadow-md hover:bg-white/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <effort.icon className="w-9 h-9 text-blue-600 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">{effort.title}</h3>
            <p className="text-gray-600 mt-1">{effort.text}</p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
</div>

      </motion.section>
    </div>
  );
};

export default TanaActivitiesPage;