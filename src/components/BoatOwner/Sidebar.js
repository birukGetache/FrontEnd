const SideBar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, FiX, FiCalendar, FiMenu, SidebarItem, FiDollarSign, FiAlertCircle, FiClock, FiList, FiUsers, FiLogOut, FiLock }) => {
    return (
      <div className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'} shadow-xl`}>
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              BoatMaster
              <span className="block text-xs font-normal text-gray-400 mt-1">Dashboard</span>
            </h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <FiX size={20} className="text-gray-300 hover:text-white" />
            ) : (
              <FiMenu size={20} className="text-gray-300 hover:text-white" />
            )}
          </button>
        </div>
  
        {/* Navigation Items */}
        <nav className="mt-6 space-y-1 px-2 flex-1 overflow-y-auto">
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"><FiCalendar size={18} className="text-white" /></div>} 
            text="Bookings" 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')}
            sidebarOpen={sidebarOpen}
            badge={12} // Example badge count
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-green-500 to-emerald-400 shadow-md"><FiDollarSign size={18} className="text-white" /></div>} 
            text="Earnings" 
            active={activeTab === 'earnings'} 
            onClick={() => setActiveTab('earnings')}
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-amber-500 to-yellow-400 shadow-md"><FiAlertCircle size={18} className="text-white" /></div>} 
            text="Pending Trips" 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
            sidebarOpen={sidebarOpen}
            badge={3} // Example badge count
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-400 shadow-md"><FiClock size={18} className="text-white" /></div>} 
            text="Availability" 
            active={activeTab === 'availability'} 
            onClick={() => setActiveTab('availability')}
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-rose-500 to-pink-400 shadow-md"><FiList size={18} className="text-white" /></div>} 
            text="Upcoming" 
            active={activeTab === 'upcoming'} 
            onClick={() => setActiveTab('upcoming')}
            sidebarOpen={sidebarOpen}
            badge={5} // Example badge count
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-violet-500 to-indigo-400 shadow-md"><FiUsers size={18} className="text-white" /></div>} 
            text="Customers" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')}
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500 to-teal-400 shadow-md"><FiDollarSign size={18} className="text-white" /></div>} 
            text="Payments" 
            active={activeTab === 'payments'} 
            onClick={() => setActiveTab('payments')}
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem 
            icon={<div className="p-1.5 rounded-md bg-gradient-to-br from-gray-500 to-gray-400 shadow-md"><FiLock size={18} className="text-white" /></div>} 
            text="Security" 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')}
            sidebarOpen={sidebarOpen}
          />
        </nav>
  
        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button 
            className={`flex items-center ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'} w-full p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group`}
            onClick={() => console.log('Logout clicked')}
          >
            <div className="p-1.5 rounded-md bg-gradient-to-br from-red-500 to-rose-400 shadow-md group-hover:shadow-lg transition-shadow">
              <FiLogOut size={18} className="text-white" />
            </div>
            {sidebarOpen && (
              <>
                <span className="text-sm font-medium">Logout</span>
                <span className="flex-1 text-right text-xs text-gray-400">v2.4.1</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };
  
  export default SideBar;