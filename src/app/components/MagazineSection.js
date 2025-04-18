import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const articles = [
  {
    category: "UNESCO",
    title: "Lake Tana Island Monasteries and its Adjacent Wetland Natural and Cultural Heritages",
    time: "4 minutes",
    image: "/Unesko.png",
  },
  {
    category: "Nature & Travel",
    title: "Tranquil Trails: Seven Scenic Walks Around Lake Tana",
    time: "5 minutes",
    image: "/MagazinImage.png"
  },  
  {
    category: "Nature",
    title: "9 places in Tana where waking at sunset up feels dreamy",
    time: "4 minutes",
    image: "/TanaNight.png",
  },
];

export default function MagazineSection() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10" id="Magazine">
      <div className="text-sm text-gray-500 font-semibold mb-2">MAGAZINE</div>
      <h1 className="text-3xl text-gray-600 font-bold mb-6">
        The source of inspiration for your Bahir Dar adventures
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Article with Animation */}
        <motion.div
          className="col-span-2 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="/Unesko.png"
            alt="Carrara Marble"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute top-4 left-4 bg-red-700 text-gray-600 font-semibold px-3 py-1 rounded">
            Religious and beauty
          </div>
          <button className="absolute top-4 right-4 text-gray-600 text-2xl">
            🤍
          </button>
          <div className="mt-4">
            <h2 className="text-xl text-gray-600 font-semibold">Power of Lake Tana</h2>
            <div className="text-gray-500 text-sm mt-1">🕒 2 minutes</div>
          </div>
        </motion.div>

        {/* Side Articles with Animation */}
        <div className="flex flex-col gap-6">
          {articles.map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <span
                  className={`text-gray-600 text-xs px-2 py-1 rounded ${item.badgeColor}`}
                >
                  {item.category}
                </span>
                <h3 className="text-md text-gray-500 font-semibold mt-1">{item.title}</h3>
                <div className="text-gray-500 text-sm mt-1">🕒 {item.time}</div>
              </div>
              <button className="text-gray-400 text-xl">🤍</button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <motion.button
          className="text-blue-200 font-semibold hover:underline"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          View all →
        </motion.button>
      </div>
    </div>
  );
}
