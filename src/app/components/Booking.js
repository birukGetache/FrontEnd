import React, { useState, useEffect } from "react";
import axios from "axios";

const BoatOwner = () => {
 
  const [bookings, setBooking] = useState([]);


  // Fetch boat owners data
  useEffect(() => {
  const fetchBoatOwners = async () => {
    try {
      const response = await axios.get("https://tankwaaddis.onrender.com/booking");
      console.log(response)
      setBooking(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching boat owners:", error);
    }
  };
  fetchBoatOwners();
},[])


  return (
    <div className="min-h-screen bg-gray-100 py-8">
    
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Boat Owners List</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Father Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Middle Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">preferred Date</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">destination Location</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">numberOfPassengers</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">boatOwner</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id} className="border-b">
            <td className="py-3 px-4 text-gray-800">{booking.firstName}</td>
            <td className="py-3 px-4 text-gray-800">{booking.lastName}</td>
            <td className="py-3 px-4 text-gray-800">{booking.middleName}</td>
            <td className="py-3 px-4 text-gray-800">{booking.preferredDate}</td>
            <td className="py-3 px-4 text-gray-800">{booking.destinationLocation}</td>
            <td className="py-3 px-4 text-gray-800">{booking.numberOfPassengers}</td>
            <td className="py-3 px-4 text-gray-800">{booking.boatOwner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default BoatOwner;