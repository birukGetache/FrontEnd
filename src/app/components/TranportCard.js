import React, { useState , useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sailboat, MapPin, Fish, Church, Droplet } from 'lucide-react';

const TransportCard = ({darkMode , setDarkMode}) => {
  const [activeSide, setActiveSide] = useState(null);
  const [color , setColor] = useState("gray-900")
  useEffect(() => {
      const saved = localStorage.getItem('darkMode');
      const isDark = saved === 'true';
     
      if (isDark) {
       setColor("white")
      } else {
        setColor("gray-900")
      }
    }, []);
  // useEffect(() => {
  //     if (color=="gray-900") {
  //      setColor("white")
  //     } else {
  //       setColor("gray-900")
  //     }
  //   }, [darkMode]);


  return (
    <motion.div
      className="h-auto w-full backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-blue-200/50 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      id="about"
    >
      {/* Sliding Background */}
      <motion.div
      className={`absolute inset-y-0 w-1/2 bg-${color} z-0`}
        initial={{ x: '100%' }}
        animate={{
          x: activeSide === 'left' ? '0%' : '100%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 h-full relative z-10">
        {/* Left: Lake Tana System Context */}
        <div
          className="p-6 md:p-8 h-full flex flex-col"
          onMouseEnter={() => setActiveSide('left')}
          onMouseLeave={() => setActiveSide(null)}
        >
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-gray-600 mr-3" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-600">Lake Tana Ecosystem</h3>
          </motion.div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Lake Tana is Ethiopia's largest lake and the source of the Blue Nile, serving as a vital hub for:
          </p>
          <ul className="space-y-3 text-gray-600 text-sm md:text-base flex-grow">
            {[
              { icon: <Church className="w-5 h-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />, 
                text: "Cultural heritage with 37 island monasteries" },
              { icon: <Fish className="w-5 h-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />, 
                text: "Biodiversity with 27 fish species and 230+ birds" },
              { icon: <Droplet className="w-5 h-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />, 
                text: "Economic potential via tourism and hydropower" }
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Transportation System */}
        <div
          className="p-6 md:p-8 h-full flex flex-col"
          onMouseEnter={() => setActiveSide('right')}
          onMouseLeave={() => setActiveSide(null)}
        >
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sailboat className="w-6 h-6 md:w-8 md:h-8 text-gray-600 mr-3" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-600">Transportation System</h3>
          </motion.div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Lake Tana's transport connects communities, tourists, and resources:
          </p>
          <ul className="space-y-3 text-gray-600 text-sm md:text-base flex-grow">
            {[
              { text: "Papyrus Boats (Tankwas): Traditional reed boats used by locals for fishing and short trips" },
              { text: "Boat Tours: Local operators offer monastery tours and Blue Nile Falls trips" },
              { text: "Ferries & Motorboats: Modern vessels link islands and Bahir Dar" }
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Sailboat className="w-5 h-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
          <motion.a
            href="#"
            className="mt-4 inline-flex items-center px-4 py-2 bg-[#a86747] text-gray-600 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors self-start"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Tours
            <Sailboat className="w-4 h-4 ml-2" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default TransportCard;