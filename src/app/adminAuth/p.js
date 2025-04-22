    {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-gray-900">Last changed 3 months ago</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-900">Add an extra layer of security</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Login Activity</p>
                        <p className="text-sm text-gray-900">Recent account access</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                        View All
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        { device: 'Chrome on Windows', location: 'New York, US', time: 'Today, 10:30 AM' },
                        { device: 'Safari on iPhone', location: 'Miami, US', time: 'Yesterday, 8:45 PM' }
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start p-2 hover:bg-gray-50 rounded">
                          <div className="bg-gray-100 p-2 rounded-full mr-3">
                            <FiLock className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.device}</p>
                            <p className="text-sm text-gray-900">{activity.location} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
                <div className="space-y-4">
                  {[
                    { device: 'Windows 10 PC', browser: 'Chrome 114.0', location: 'New York, US', lastActive: 'Active now' },
                    { device: 'iPhone 13', browser: 'Safari 16.5', location: 'Miami, US', lastActive: '2 hours ago' }
                  ].map((device, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{device.device}</p>
                        <p className="text-sm text-gray-900">{device.browser} • {device.location}</p>
                        <p className="text-xs text-gray-400 mt-1">Last active {device.lastActive}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800 text-sm">Log out</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}