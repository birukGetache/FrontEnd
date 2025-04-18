"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const cardsRow1 = [
  {
    id: "lake-tana-heritage",
    category: "LAKE TANA - HERITAGE & HISTORY",
    title: "Uncover Ancient Monasteries on Lake Tana",
    buttonText: "Find out more",
    image: "/LakeTana.png",
    description: "Journey through Lake Tana’s ancient island monasteries and historic sites.",
    moreInfo: "Discover centuries-old Ethiopian Orthodox churches, sacred manuscripts, and the spiritual heritage of Ethiopia’s largest lake."
  },
  {
    id: "lake-tana-biodiversity",
    category: "Bio Diversity",
    title: "Flavors of Lake Tana: Traditional Ethiopian Cuisine",
    buttonText: "Find out more",
    image: "/Hipopotamous.png",
    description: "Savor authentic Ethiopian dishes by the tranquil shores of Lake Tana.",
    moreInfo: "Explore rich culinary traditions, from spicy stews to injera, all made with local ingredients and cultural storytelling."
  }
];


const cardRow2Large = {
  id: "Nile",
  category: "NILE RIVER WELLNESS & ESCAPES",
  title: "Kato Dool Wellness Resort",
  buttonText: "Explore More",
  image: "/Nile.png",
  description: "Experience holistic well-being at the heart of Nubian culture.",
  moreInfo: "Embrace tranquility with organic cuisine, meditation, and panoramic Nile views."
};

const cardRow2Small = {
  image:
    "/imaget.png", // Doctors
};

export default function AbsoluteClone() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-8">
      {/* Row 1: Two Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsRow1.map((card, idx) => (
          <motion.div
            key={idx}
            className="flex rounded-xl shadow-md overflow-hidden h-72"
            initial={{ opacity: 0, scale: 0.95 }} // Initial state
            whileInView={{ opacity: 1, scale: 1 }} // Animation when in view
            viewport={{ once: true }} // Trigger animation only once
            transition={{ duration: 0.6, delay: 0.1 * idx }} // Smooth animation
          >
            {/* Text content */}
            <div className="w-1/2 p-6 flex flex-col justify-center">
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                {card.category}
              </p>
              <h2 className="text-xl text-gray-500 font-bold mb-4">{card.title}</h2>
              <Link href={`/cardDetail/${card.id}`}>
  <button className="bg-blue-300 hover:bg-blue-300 text-gray-600 font-semibold px-4 py-2 rounded w-fit">
    {card.buttonText}
  </button>
</Link>

            </div>

            {/* Image */}
            <div className="w-1/2 relative">
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-opacity-70 rounded-full p-2">
                🔍
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: One Big Card + One Smaller beside it */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big card spans 2 cols */}
        <motion.div
          className="col-span-1 md:col-span-2 flex rounded-xl shadow-md overflow-hidden h-96"
          initial={{ opacity: 0, scale: 0.95 }} // Initial state
          whileInView={{ opacity: 1, scale: 1 }} // Animation when in view
          viewport={{ once: true }} // Trigger animation only once
          transition={{ duration: 0.6 }}
        >
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
              {cardRow2Large.category}
            </p>
            <h2 className="text-2xl text-gray-500 font-bold mb-4">{cardRow2Large.title}</h2>
            
            <Link href={`/cardDetail/${cardRow2Large.id}`}>
            <button className="bg-blue-300 hover:bg-blue-300 text-gray-600 font-semibold px-4 py-2 rounded w-fit">
              {cardRow2Large.buttonText}
            </button>
            </Link>
          </div>
          <div className="w-1/2 relative">
            <img
              src={cardRow2Large.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Smaller card */}
        <motion.div
          className="h-96 overflow-hidden rounded-xl shadow-md"
          initial={{ opacity: 0, scale: 0.95 }} // Initial state
          whileInView={{ opacity: 1, scale: 1 }} // Animation when in view
          viewport={{ once: true }} // Trigger animation only once
          transition={{ duration: 0.6 }}
        >
          <img
            src={cardRow2Small.image}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
