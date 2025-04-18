"use client"; // Mark this as a Client Component
import React, { useState, useEffect } from "react";
import { WiThermometer, WiWindy, WiHumidity, WiCloudy , FaAnchor } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FaLeaf } from "react-icons/fa";

import { motion } from "framer-motion";
const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const dummyData = {
      main: {
        temp: 22,
        humidity: 65,
      },
      wind: {
        speed: 5,
      },
      weather: [
        {
          description: "clear sky", // Example condition
        },
      ],
    };
    setWeatherData(dummyData);
  }, []);

  if (!weatherData) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  const { weather } = weatherData;
  const condition = weather[0].description;

  // Normalize the condition string to match the translation keys
  const normalizeCondition = (condition) => {
    return condition
      .toLowerCase() // Convert to lowercase
      .split(" ") // Split into words
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      ) // Capitalize the first letter of each word except the first
      .join(""); // Join into a single string
  };

  // Translate the weather condition
  const translatedCondition = t(`weatherConditions.${normalizeCondition(condition)}`);

  return (
    <div className="grid">
      <p className="text-[#6ca6c1]  text-start text-xl mt-4 capitalize">
        {t('condition')}: {translatedCondition}
      </p>
      <motion.div className="flex box-border pr-3  max-w-52 gap-1  bg-gray-100 rounded-3xl h-28 object-cover"
       initial={{ opacity: 0, scale: 0.5 }}
       whileInView={{ opacity: 1, scale: 1 }}
       transition={{ duration: 1 }}
       viewport={{ once: false }}
       >
       <div className="flex items-center p-2">
          <span className="w-12 h-12 rounded-full bg-[#6ca6c1] flex justify-center items-center">
          <FaLeaf color="white" size={20}></FaLeaf>
          </span>
    
         </div>

       <div className="grid m-auto">
        <span className="text-[#6ca6c1]  font-bold text-5xl">19&deg;</span>
        <span className="text-[#6ca6c1]   flex gap-2 text-nowrap"> <FaAnchor color="#6ca6c1" size={18}></FaAnchor> BahirDar | Ethiopia </span>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherInfo;