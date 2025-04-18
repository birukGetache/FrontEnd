"use client";
import { FaTelegram, FaLinkedin, FaTwitter, FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import React from 'react';

const Invite = ({id}) => {
  const [copied, setCopied] = useState("");

  const handleCopyLink = (link, platformName) => {
    navigator.clipboard.writeText(link);
    setCopied(platformName);
    setTimeout(() => setCopied(""), 2000);
  };

  const platforms = [
    { name: "Telegram", icon: <FaTelegram className="text-blue-400 hover:text-blue-300 transition-colors" size={28} />, link: "https://t.me/your_channel" },
    { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700 hover:text-blue-600 transition-colors" size={28} />, link: "https://linkedin.com/in/your_profile" },
    { name: "Twitter", icon: <FaTwitter className="text-blue-400 hover:text-blue-300 transition-colors" size={28} />, link: "https://twitter.com/your_profile" },
    { name: "Discord", icon: <FaDiscord className="text-indigo-600 hover:text-indigo-500 transition-colors" size={28} />, link: "https://discord.gg/your_invite_code" },
    { name: "YouTube", icon: <FaYoutube className="text-red-500 hover:text-red-400 transition-colors" size={28} />, link: "https://youtube.com/channel/your_channel" },
    { name: "Instagram", icon: <FaInstagram className="text-pink-500 hover:text-pink-400 transition-colors" size={28} />, link: "https://instagram.com/your_profile" },
  ];

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl mx-4 sm:mx-8 md:mx-20 my-8" id={id}>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Connect With Us</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
        {platforms.map((platform) => (
          <div key={platform.name} className="relative flex flex-col items-center group">
            <button
              onClick={() => handleCopyLink(platform.link, platform.name)}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              {platform.icon}
            </button>
            <p className="mt-2 text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
              {platform.name}
            </p>
            {copied === platform.name && (
              <span className="absolute -top-8 bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full animate-fadeIn">
                Copied!
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Invite;