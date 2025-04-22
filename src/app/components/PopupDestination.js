import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PopupDestination = ({
  visibleCardId,
  setVisibleCardId,
  destination,
  modalVariants,
  i18n,
  currency, // e.g., 'USD', 'EUR'
}) => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/ETB");
        const data = await response.json();
        console.log("Exchange Rates:", data); // ✅ DEBUG
        setExchangeRates(data.rates || {});
      } catch (err) {
        console.error("Error fetching exchange rates", err);
      }
    };

    fetchRates();
  }, []);

  if (visibleCardId !== destination._id) return null;

  const etbPrice = destination.price ?? 0;
  const rate = exchangeRates[currency] ?? 1;
  const convertedPrice = (etbPrice * rate).toFixed(2);

  return (
    <motion.div
      className="absolute top-0 flex items-center justify-center h-screen w-screen bg-black bg-opacity-50 z-50 mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setVisibleCardId(null)}
    >
      <motion.div
        className="bg-white rounded-xl p-10 flex flex-col items-center justify-center sm:w-[90%] md:w-[50%] shadow-2xl relative"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-md transition-all duration-200"
          onClick={() => setVisibleCardId(null)}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={destination.image || "/fallback-image.jpg"}
          alt={destination.titles[i18n.language]}
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        {/* Title */}
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          {destination.titles[i18n.language]}
        </h4>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {destination.descriptions[i18n.language]}
        </p>
        <p className="text-gray-600 mb-4">
          Price: {convertedPrice} {currency}
        </p>

        {/* Book Button */}
        <Link
          href={`/details/${destination._id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mx-auto"
        >
          check out
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PopupDestination;
