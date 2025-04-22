import React, { useState, useEffect } from "react";
import axios from "axios";

const BoatOwner = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [boatOwnerStats, setBoatOwnerStats] = useState({});
  const [selectedBoatOwner, setSelectedBoatOwner] = useState(null);
  const token = localStorage.getItem("authToken");

  // Fetch boat owners data
  useEffect(() => {
    const fetchBoatOwners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
        setFilteredBookings(response.data);
        calculateBoatOwnerStats(response.data);
      } catch (error) {
        console.error("Error fetching boat owners:", error);
      }
    };
    fetchBoatOwners();
  }, [token]);

  // Calculate boat owner statistics
  const calculateBoatOwnerStats = (data) => {
    const stats = {};
    data.forEach(booking => {
      if (!booking.boatOwner) return;
      
      if (!stats[booking.boatOwner]) {
        stats[booking.boatOwner] = {
          count: 0,
          futureTrips: 0,
          ownerName: booking.boatOwnerName || booking.boatOwner,
          id: booking.boatOwnerId || booking.boatOwner
        };
      }
      
      stats[booking.boatOwner].count++;
      
      if (new Date(booking.preferredDate) > new Date()) {
        stats[booking.boatOwner].futureTrips++;
      }
    });
    setBoatOwnerStats(stats);
  };

  // Filter bookings by search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        booking =>
          (booking.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.boatOwner?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings]);

  // Filter by selected boat owner
  useEffect(() => {
    if (selectedBoatOwner) {
      setFilteredBookings(
        bookings.filter(booking => booking.boatOwner === selectedBoatOwner)
      );
    }
  }, [selectedBoatOwner, bookings]);

  const handleExploreBoatOwner = (boatOwnerId) => {
    setSelectedBoatOwner(boatOwnerId);
  };

  const resetFilters = () => {
    setSelectedBoatOwner(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Boat Owners Management</h2>
        
        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by Name or Boat Owner</label>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button
                onClick={resetFilters}
                className="mt-6 md:mt-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Boat Owner Stats */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Boat Owner Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(boatOwnerStats).map(([id, stat]) => (
                <div 
                  key={id} 
                  className={`p-3 rounded-lg border ${selectedBoatOwner === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <h4 className="font-medium text-gray-700">{stat.ownerName}</h4>
                  <p className="text-sm text-gray-700">Total Trips: {stat.count}</p>
                  <p className="text-sm text-gray-700">Upcoming Trips: {stat.futureTrips}</p>
                  <button
                    onClick={() => handleExploreBoatOwner(id)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    {selectedBoatOwner === id ? "Currently viewing" : "View trips"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Father Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Middle Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Preferred Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Destination</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Passengers</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Boat Owner</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{booking.firstName}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.lastName}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.middleName}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {new Date(booking.preferredDate).toLocaleDateString()}
                        {new Date(booking.preferredDate) > new Date() && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Upcoming</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{booking.destinationLocation}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.numberOfPassengers}</td>
                      <td 
                        className="py-3 px-4 text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleExploreBoatOwner(booking.boatOwner)}
                      >
                        {booking.boatOwner}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No bookings found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatOwner;