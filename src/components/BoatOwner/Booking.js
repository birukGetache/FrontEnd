import { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = ({ StatCard, counts, FiCalendar, Line, id }) => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailability();
  }, [id]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/boatowners/availability/${id}`);
      setAvailability(response.data.available);
      setError(null);
    } catch (err) {
      setError('Failed to fetch availability');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      console.log("wee")
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/boatowners/availability/${id}`, {
        availability: !availability
      });
      console.log(response.data.availability)
      setAvailability(response.data.availability);
      setError(null);
    } catch (err) {
      setError('Failed to update availability');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Availability Badge/Button */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Boat Availability</h2>
          <p className="text-sm text-gray-500">Current booking status</p>
        </div>
        <button
          onClick={toggleAvailability}
          disabled={loading}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            availability 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          } flex items-center space-x-2`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Updating...</span>
            </>
          ) : (
            <>
              <span className={`h-2 w-2 rounded-full ${availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{availability ? 'Available' : 'Unavailable'}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Daily Bookings"
          value={counts.todayCount}
          change={counts.todayCount - counts.yesterdayCount}
          icon={<FiCalendar className="text-blue-500" size={24} />}
          className="bg-gradient-to-br from-blue-50 to-white"
        />
        <StatCard
          title="Weekly Bookings"
          value={counts.weekCount}
          change={counts.weekCount - counts.lastWeekCount}
          icon={<FiCalendar className="text-green-500" size={24} />}
          className="bg-gradient-to-br from-green-50 to-white"
        />
        <StatCard
          title="Monthly Bookings"
          value={counts.monthCount}
          change={counts.monthCount - counts.lastMonthCount}
          icon={<FiCalendar className="text-purple-500" size={24} />}
          className="bg-gradient-to-br from-purple-50 to-white"
        />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Booking Trends</h3>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span className="text-xs text-gray-500">Bookings</span>
          </div>
        </div>
        <div className="h-80">
          <Line
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [
                {
                  label: 'Bookings',
                  data: [counts.weekCount, 22, counts.lastWeekCount, counts.weekCount],
                  borderColor: 'rgba(79, 70, 229, 1)',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  tension: 0.3,
                  fill: true,
                  pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                  pointBorderColor: '#fff',
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(79, 70, 229, 1)',
                  pointHoverBorderColor: '#fff',
                  pointHitRadius: 10,
                  pointBorderWidth: 2,
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  titleFont: { size: 14, weight: 'bold' },
                  bodyFont: { size: 12 },
                  padding: 12,
                  usePointStyle: true,
                }
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: '#6B7280',
                  }
                },
                y: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                  },
                  ticks: {
                    color: '#6B7280',
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;