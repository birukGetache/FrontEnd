"use client"
import { useState } from 'react';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from "axios";
const CompactLoginForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/boatowners/login",credentials);
      const user = response.data.user;
      router.push(`/boatOwner?name=${encodeURIComponent(user.name)}&id=${user._id}`);
      
      
      // if (response.data.token) {
      //   localStorage.setItem("authToken", response.data.token);
        
      //   if (response.data.user) {
      //     localStorage.setItem("user", JSON.stringify(response.data.user));
      //   }
      //   console.log(true)
        
      //   setLoginSuccess(true);
      // } else {
      //   setError("Invalid response from server");
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false)
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-72 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 space-y-4 p-6 transition-all duration-300 hover:shadow-xl"
      >
        {/* Form Header (optional) */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Welcome</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {/* Username Field */}
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-200 ${focusedField === 'username' ? 'translate-y-0' : 'translate-y-1'}`}>
            <FiUser className={`h-4 w-4 ${focusedField === 'username' ? 'text-blue-500' : 'text-gray-400'} transition-colors`} />
          </div>
          <input
            type="text"
            placeholder="Username"
            className="block w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border-b-2 border-gray-200 focus:border-blue-500 rounded-t-md focus:outline-none focus:bg-white transition-all duration-200"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-200 ${focusedField === 'password' ? 'translate-y-0' : 'translate-y-1'}`}>
            <FiLock className={`h-4 w-4 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'} transition-colors`} />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="block w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border-b-2 border-gray-200 focus:border-blue-500 rounded-t-md focus:outline-none focus:bg-white transition-all duration-200"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white mt-6
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
            }
            transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              Sign in
              <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </button>

        {/* Footer (optional) */}
        <div className="text-center mt-4">
          <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default CompactLoginForm;