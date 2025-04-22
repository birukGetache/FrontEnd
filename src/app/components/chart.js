import React, { useEffect, useState } from "react";
import { fetchDashboardData, fetchWeatherData } from "./apiService";
import TopBookings from "@components/TopBookings";
import TopBlogs from "@components/Blog/TopBlogs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  FaCalendarAlt,
  FaShip,
  FaHandshake,
  FaBlog,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import WeatherWidget from "@components/WeatherWidget";

const Dashboard = () => {
  const [data, setData] = useState({
    bookings: [],
    boatOwners: [],
    sponsors: [],
    blogs: [],
    destinations: [],
    users: [],
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardData, weatherData] = await Promise.all([
          fetchDashboardData(token),
          fetchWeatherData()
        ]);
        
        setData(dashboardData);
        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const chartData = [
    { name: "Bookings", count: data.bookings.length },
    { name: "Boat Owners", count: data.boatOwners.length },
    { name: "Sponsors", count: data.sponsors.length },
    { name: "Blogs", count: data.blogs.length },
    { name: "Users", count: data.users.length },
    { name: "Destinations", count: data.destinations.length }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600 font-medium text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of key metrics and data</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:w-7/12 space-y-4 md:space-y-6">
          <WeatherWidget weather={weather} />
          
          <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold text-gray-800">Data Overview</h2>
              <select className="text-xs border border-gray-300 rounded px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="w-full lg:w-5/12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <StatCard 
              title="Bookings" 
              value={data.bookings.length} 
              icon={<FaCalendarAlt className="text-indigo-600 text-lg" />} 
              bgColor="bg-indigo-100"
            />
            <StatCard 
              title="Boat Owners" 
              value={data.boatOwners.length} 
              icon={<FaShip className="text-blue-600 text-lg" />} 
              bgColor="bg-blue-100"
            />
            <StatCard 
              title="Sponsors" 
              value={data.sponsors.length} 
              icon={<FaHandshake className="text-green-600 text-lg" />} 
              bgColor="bg-green-100"
            />
            <StatCard 
              title="Blogs" 
              value={data.blogs.length} 
              icon={<FaBlog className="text-amber-600 text-lg" />} 
              bgColor="bg-amber-100"
            />
            <StatCard 
              title="Users" 
              value={data.users.length} 
              icon={<FaUsers className="text-red-600 text-lg" />} 
              bgColor="bg-red-100"
            />
            <StatCard 
              title="Destinations" 
              value={data.destinations.length} 
              icon={<FaMapMarkerAlt className="text-purple-600 text-lg" />} 
              bgColor="bg-purple-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
           <TopBookings bookings={data.bookings} /> 
           <TopBlogs blogs={data.blogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
        <p className="text-xs text-green-500 mt-1 flex items-center">
          <span className="inline-block mr-1">↑</span>
          <span>{Math.floor(Math.random() * 20) + 1}% from last month</span>
        </p>
      </div>
      <div className={`${bgColor} p-3 rounded-full h-fit`}>
        {icon}
      </div>
    </div>
  </div>
);

export default Dashboard;