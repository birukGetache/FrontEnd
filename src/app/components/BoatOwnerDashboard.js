"use client"
import React, { useState , useEffect } from 'react';
import { FiCalendar, FiDollarSign, FiClock,FiCheckCircle, FiAlertCircle, FiMapPin,FiMonitor, FiUsers, FiList, FiLock, FiLogOut, FiMenu, FiX , FiKey } from 'react-icons/fi';
import { Bar, Line, Pie } from 'react-chartjs-2';
import SideBar from "@components/BoatOwner/Sidebar";
import Bookings from "@components/BoatOwner/Booking";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { Chart, registerables } from 'chart.js';
import { useParams } from 'next/navigation';
Chart.register(...registerables);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const [timeSlotModal, setTimeSlotModal] = useState(false);
  const [selectedBoat, setSelectedBoat] = useState('');
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const id = searchParams.get('id');
  const [counts , setCounts] = useState({});
  const [earning , setEarning] = useState({})
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [confirm , setConfirm] = useState([])
  const [all , setAll] = useState([])
  const [filter, setFilter] = useState('all');
  const [ipAddress, setIpAddress] = useState('Fetching...');
  const [location, setLocation] = useState('Fetching...');
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setIpAddress(data.ip);
        setLocation(`${data.city}, ${data.region}`);
      })
      .catch(() => {
        setIpAddress('Unknown IP');
        setLocation('Unknown location');
      });
  }, []);
  console.log('ID:', id); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking count/details
        const bookingRes = await axios.post("http://localhost:5000/boatowners/booking", { name, id });
       
        setCounts(bookingRes.data);
        console.log(bookingRes.data)
        // Fetch earnings
        const earningRes = await axios.post("http://localhost:5000/boatowners/earning", { name, id });
        setEarning(earningRes.data);

        // Fetch monthly grouped earnings
        const monthlyRes = await axios.post(`http://localhost:5000/boatowners/month/${id}`);
        setMonthlyEarnings(monthlyRes.data);
        const resConfirm = await axios.post(`http://localhost:5000/boatowners/get/${id}`);
        console.log("Monthly earnings response:", resConfirm.data);
        setConfirm(resConfirm.data)
        const resultAll = await axios.post(`http://localhost:5000/boatowners/getAll/${id}`);
        console.log("Monthly earnings response:", resultAll.data);
        setAll(resultAll.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, id]);

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edg')) return 'Edge';
    return 'Unknown';
  };

  const handleSendSession = async () => {
    const sessionData = {
      device: navigator?.platform || 'Unknown device',
      browser: getBrowserName(),
      location,
      ip: ipAddress,
      _id:id,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:5000/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });

      if (!res.ok) throw new Error('Failed to send session data');
      alert('✅ Session data sent successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Error sending session data.');
    }
  };
  const pendingTrips = [
    { id: 1, boat: 'Speedster 3000', date: '2023-06-15', customer: 'John Doe', status: 'confirmed' },
    { id: 2, boat: 'Luxury Yacht', date: '2023-06-18', customer: 'Jane Smith', status: 'pending' },
    { id: 3, boat: 'Fishing Boat', date: '2023-06-20', customer: 'Mike Johnson', status: 'confirmed' }
  ];

  const earningsData = {
    labels: monthlyEarnings.map((item) => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: monthlyEarnings.map((item) => item.totalAmount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  

  const filteredBookings = confirm.filter(group =>
    filter === 'all' ? true : group._id === filter
  );

  const boats = ['Speedster 3000', 'Luxury Yacht', 'Fishing Boat', 'Pontoon Party'];
  const booking ={StatCard , counts , FiCalendar , Line , id }
  const upcomingBookings = [
    { id: 1, boat: 'Speedster 3000', date: '2023-06-10', time: '09:00 - 12:00', customer: 'Alex Brown' },
    { id: 2, boat: 'Luxury Yacht', date: '2023-06-12', time: '14:00 - 18:00', customer: 'Sarah Wilson' }
  ];

  const barChartData = {
    labels: monthlyEarnings.map(item => {
      const date = new Date(item._id.year, item._id.month - 1); // month is 0-indexed
      return date.toLocaleString('default', { month: 'short', year: 'numeric' }); // "Apr 2025"
    }),
    datasets: [
      {
        label: 'Total Earnings (ETB)',
        data: monthlyEarnings.map(item => item.totalAmount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  

  const sideBarContent = {sidebarOpen , setSidebarOpen , activeTab , setActiveTab , FiX ,FiCalendar , FiMenu , SidebarItem , FiDollarSign, FiAlertCircle, FiClock, FiList, FiUsers , FiLogOut , FiLock}

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     <SideBar {...sideBarContent}></SideBar>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeTab === 'bookings' && 'Bookings Overview'}
            {activeTab === 'earnings' && 'Earnings Analytics'}
            {activeTab === 'pending' && 'Pending & Reserved Trips'}
            {activeTab === 'availability' && 'Boat Availability'}
            {activeTab === 'upcoming' && 'Upcoming Bookings'}
            {activeTab === 'customers' && 'Customer Details'}
            {activeTab === 'payments' && 'Payment Withdrawals'}
            {activeTab === 'security' && 'Security Settings'}
          </h2>
        </header>

        <main className="p-6">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
           <Bookings {...booking}></Bookings>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Total Earnings" 
                  value={earning.totalEarnings} 
                  change="analizing" 
                  icon={<FiDollarSign className="text-green-500" size={24} />}
                />
                <StatCard 
                  title="Avg. per Booking" 
                  value={earning.averagePerBooking} 
                  change="analizing" 
                  icon={<FiDollarSign className="text-gray-900" size={24} />}
                />
                <StatCard 
                  title="Projected Monthly" 
                  value={earning.projectedMonthlyEarnings} 
                  change="Based on current trends" 
                  icon={<FiDollarSign className="text-purple-500" size={24} />}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Monthly Earnings</h3>
                <Bar data={earningsData} options={{ responsive: true }} />
              </div>
              <div className="grid grid-cols-1  gap-6">
              <div className="bg-white p-6 rounded-lg shadow space-y-6">
  <h3 className="text-lg font-semibold mb-4">📅 Monthly Earnings (in Birr)</h3>

  {/* Bar Chart */}
  <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: true }}}} />

  {/* Summary per Month */}
  <div className="mt-6 space-y-4">
    {monthlyEarnings.map((item, index) => {
      const date = new Date(item._id.year, item._id.month - 1);
      const formattedDate = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      return (
        <div key={index} className="p-4 border rounded-md bg-gray-50 shadow-sm">
          <h4 className="font-semibold text-gray-800">{formattedDate}</h4>
          <p className="text-sm text-gray-600">Bookings: {item.bookings.length}</p>
          <p className="text-sm text-gray-600">Total Earnings: ብር {item.totalAmount.toLocaleString()}</p>
        </div>
      );
    })}
  </div>
</div>

<div className="bg-white p-6 rounded-lg shadow space-y-6">
  <h3 className="text-lg font-semibold mb-4">📚 Booking Details</h3>

  {monthlyEarnings.map((month, idx) => (
    <div key={idx} className="space-y-4">
      <h4 className="text-md font-bold text-gray-700 border-b pb-1">
        {new Date(month._id.year, month._id.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })} 
        — {month.bookings.length} bookings, ብር {month.totalAmount.toLocaleString()}
      </h4>

      {month.bookings.map((booking, bIdx) => (
        <div key={bIdx} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Passenger Info */}
            <div>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Name:</span> {`${booking.firstName} ${booking.middleName} ${booking.lastName}`}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Phone:</span> {booking.phone}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Email:</span> {booking.email}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Passengers:</span> {booking.numberOfPassengers}</p>
            </div>

            {/* Booking Info */}
            <div>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Departure:</span> {booking.departureLocation}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Destination:</span> {booking.destinationLocation}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Transport:</span> {booking.typeOfTransport}</p>
              <p className="font-semibold text-slate-800"><span className="font-semibold text-slate-800">Payment:</span> {booking.paymentMethod} ({booking.currency})</p>
            </div>
          </div>

          {/* Dates and Amount */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <p><span className="font-semibold">Preferred Date:</span> {new Date(booking.preferredDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Created At:</span> {new Date(booking.createdAt).toLocaleString()}</p>
            <p>
              <span className="font-semibold text-green-600">Amount:</span>{" "}
              {booking.currency === "ETB" ? `ብር ${booking.amount}` : `$${booking.amount}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  ))}
</div>
              </div>
            </div>
          )}

          {/* Pending Trips Tab */}
          {activeTab === 'pending' && (
          <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Boat Owner Bookings</h2>
    
          <div className="flex gap-4 mb-6">
            {['all', 'pending', 'confirmed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded capitalize ${
                  filter === status
                    ? status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : status === 'confirmed'
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
    
          {filteredBookings.map((group) => (
            <div key={group._id} className="mb-10">
              <h3 className="text-xl font-semibold capitalize mb-4 text-gray-700">
                {group._id} Bookings
              </h3>
    
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                      <th className="px-6 py-3">First Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Passengers</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Preferred Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.bookings.map((booking) => (
                      <tr key={booking._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">{booking.firstName}</td>
                        <td className="px-6 py-4 text-gray-600">{booking.email}</td>
                        <td className="px-6 py-4 text-gray-600">{booking.numberOfPassengers}</td>
                        <td className="px-6 py-4 text-gray-600">${booking.amount}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(booking.preferredDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Boat Availability</h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setMaintenanceModal(true)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                    >
                      Mark Unavailable
                    </button>
                    <button 
                      onClick={() => setTimeSlotModal(true)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                    >
                      Set Time Slots
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {boats.map(boat => (
                    <div key={boat} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{boat}</h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Next booking: June 10</p>
                        <p>Available days: Mon, Wed, Fri</p>
                        <p>Time slots: 9AM-12PM, 2PM-6PM</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Availability Calendar</h3>
                <div className="border rounded-lg p-4 h-64 flex items-center justify-center bg-gray-50">
                  <p className="text-gray-900">Calendar view would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Bookings Tab */}
          {activeTab === 'upcoming' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Upcoming Bookings</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{booking.boat}</h4>
                        <p className="text-sm text-gray-900">{booking.date} • {booking.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.customer}</p>
                        <div className="flex space-x-2 mt-1">
                          <button className="text-sm text-gray-600 hover:text-gray-800">Contact</button>
                          <button className="text-sm text-gray-600 hover:text-gray-800">Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
          <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">All Bookings</h2>
        
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Passengers</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Payment</th>
                </tr>
              </thead>
              <tbody>
                {all.map((booking, index) => (
                  <tr key={booking._id || index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{booking.firstName}</td>
                    <td className="px-4 py-2">{booking.lastName}</td>
                    <td className="px-4 py-2">{booking.email}</td>
                    <td className="px-4 py-2">{booking.numberOfPassengers}</td>
                    <td className="px-4 py-2">${booking.amount}</td>
                    <td className="px-4 py-2">{new Date(booking.preferredDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{booking.departureLocation}</td>
                    <td className="px-4 py-2">{booking.destinationLocation}</td>
                    <td className="px-4 py-2">{booking.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Available Balance" 
                  value="$8,450" 
                  change="Ready to withdraw" 
                  icon={<FiDollarSign className="text-green-500" size={24} />}
                />
                <StatCard 
                  title="Pending Clearance" 
                  value="$2,300" 
                  change="Clears in 3 days" 
                  icon={<FiDollarSign className="text-yellow-500" size={24} />}
                />
                <StatCard 
                  title="Total Withdrawn" 
                  value="$24,200" 
                  change="All time" 
                  icon={<FiDollarSign className="text-gray-900" size={24} />}
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Withdrawal Requests</h3>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
                    Request Withdrawal
                  </button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 1, date: '2023-06-01', amount: '$5,000', method: 'Bank Transfer', status: 'Completed' },
                        { id: 2, date: '2023-05-15', amount: '$3,200', method: 'PayPal', status: 'Completed' },
                        { id: 3, date: '2023-05-01', amount: '$4,500', method: 'Bank Transfer', status: 'Completed' }
                      ].map(payment => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.method}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Withdrawal Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Automatic Monthly Withdrawal</p>
                      <p className="text-sm text-gray-900">Transfers available balance on the 1st of each month</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Minimum Balance Threshold</p>
                      <p className="text-sm text-gray-900">Only withdraw when balance exceeds $2,000</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
  <div className="space-y-6">
  {/* Password Section */}
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-4">Account Security</h3>

    {/* Current Device Info */}
    <div className="p-4 border rounded-lg mt-4 bg-blue-50 border-blue-100">
      <h4 className="font-medium flex items-center gap-2 text-blue-700">
        <FiMonitor className="text-blue-600" />
        Current Session
      </h4>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Device</p>
          <p className="font-medium">{navigator?.platform || 'Unknown device'}</p>
        </div>
        <div>
          <p className="text-gray-500">Browser</p>
          <p className="font-medium">{getBrowserName()}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium flex items-center">
            <FiMapPin className="mr-1" size={14} />
            {location}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Last active: {new Date().toLocaleTimeString()} • IP: {ipAddress}
      </p>

      {/* ✅ Send Button */}
      <button
        onClick={handleSendSession}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Session to Backend
      </button>
    </div>
  </div>

  {/* Active Sessions */}
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="space-y-3">
      <div className="p-3 border rounded-lg bg-blue-50 border-blue-100">
        <div className="flex justify-between">
          <div>
            <p className="font-medium flex items-center gap-1">
              <FiCheckCircle className="text-green-500" />
              This device
            </p>
            <p className="text-sm text-gray-600">
              {navigator?.platform} • {getBrowserName()} • {location}
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Active now
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Connected since: {new Date().toLocaleDateString()} • IP: {ipAddress}
        </p>
      </div>
    </div>
  </div>
</div>
)}
        </main>
      </div>

      {/* Maintenance Modal */}
      {maintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Mark Boat as Unavailable</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Boat</label>
                <select 
                  value={selectedBoat}
                  onChange={(e) => setSelectedBoat(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select a boat</option>
                  {boats.map(boat => (
                    <option key={boat} value={boat}>{boat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option>Maintenance</option>
                  <option>Repairs</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                  <input type="date" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" rows={3}></textarea>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3">
              <button 
                onClick={() => setMaintenanceModal(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Mark Unavailable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Slot Modal */}
      {timeSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Set Available Time Slots</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Boat</label>
                <select 
                  value={selectedBoat}
                  onChange={(e) => setSelectedBoat(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select a boat</option>
                  {boats.map(boat => (
                    <option key={boat} value={boat}>{boat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-gray-600" />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slots</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="time" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <span>to</span>
                    <input type="time" className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <button className="text-red-500 hover:text-red-700">
                      <FiX />
                    </button>
                  </div>
                  <button className="flex items-center text-gray-600 text-sm">
                    <FiPlus className="mr-1" /> Add another time slot
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3">
              <button 
                onClick={() => setTimeSlotModal(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Save Time Slots
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick, sidebarOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-6 py-3 transition-colors duration-200 ${active ? 'bg-gray-700 text-white' : 'text-gray-100 hover:bg-gray-700 hover:bg-opacity-50'}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

const StatCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-900 mt-1">{change}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-full h-fit">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;