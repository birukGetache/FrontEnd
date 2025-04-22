import React from "react";
import {
  FaMapMarkerAlt,
  FaSun,
  FaCloud,
  FaCloudRain,
  FaWater,
  FaWind,
  FaTemperatureHigh,
} from "react-icons/fa";

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = () => {
    if (!weather) return <FaSun />;
    const precipitation = weather.hourly.precipitation[0];
    
    if (precipitation > 5) return <FaCloudRain className="text-blue-400" />;
    if (precipitation > 0) return <FaCloud className="text-gray-400" />;
    return <FaSun className="text-yellow-400" />;
  };

  const getCurrentTemperature = () => {
    if (!weather) return "N/A";
    return `${weather.hourly.temperature_2m[0]}°C`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm md:text-base font-medium text-gray-700 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            Bahir Dar, Ethiopia
          </h2>
          <div className="flex items-center mt-2">
            <span className="text-4xl mr-3">
              {getWeatherIcon()}
            </span>
            <div>
              <p className="text-2xl font-semibold">
                {getCurrentTemperature()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end">
            <FaWater className="text-blue-400 mr-1 text-sm" />
            <span className="text-xs text-gray-600">Humidity: 65%</span>
          </div>
          <div className="flex items-center justify-end">
            <FaWind className="text-blue-400 mr-1 text-sm" />
            <span className="text-xs text-gray-600">Wind: 8 km/h</span>
          </div>
          <div className="flex items-center justify-end">
            <FaTemperatureHigh className="text-red-400 mr-1 text-sm" />
            <span className="text-xs text-gray-600">Feels like: {getCurrentTemperature()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;