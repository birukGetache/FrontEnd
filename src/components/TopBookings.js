import React from "react";
import { FaCalendarAlt, FaStar, FaUser } from "react-icons/fa";

const TopBookings = ({ bookings }) => {
  // Find most booked destinations
  const getMostBookedDestinations = () => {
    const destinationCounts = {};
    
    bookings.forEach(booking => {
      const destination = booking.destinationLocation || 'Unknown';
      destinationCounts[destination] = (destinationCounts[destination] || 0) + 1;
    });

    return Object.entries(destinationCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Get top 3
  };

  const mostBookedDestinations = getMostBookedDestinations();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaCalendarAlt className="mr-2 text-indigo-600" />
        Most Popular Destinations
      </h2>
      <div className="space-y-4">
        {mostBookedDestinations.length > 0 ? (
          mostBookedDestinations.map((destination, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{destination.name}</p>
                <p className="text-sm text-gray-500">
                  {destination.count} {destination.count === 1 ? 'booking' : 'bookings'}
                </p>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 3) + 3}.{Math.floor(Math.random() * 9)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No booking data available</p>
        )}
      </div>
    </div>
  );
};

export default TopBookings;