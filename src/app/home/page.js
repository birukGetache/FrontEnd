"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLink, FaTwitter, FaFacebook, FaInstagram, FaEdit, FaTrash } from "react-icons/fa";
import BottomNavBar from "../components/BottomNavBar";
import { useTranslation } from "react-i18next";

const SponsorPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Fetch sponsors from the backend
  const fetchSponsors = async () => {
    try {
      const response = await axios.get("https://tankwaaddis.onrender.com/sponser");
      setSponsors(response.data);
    } catch (error) {
      console.error("Failed to fetch sponsors:", error);
    }
  };

  // Delete sponsor
  const deleteSponsor = async (id) => {
    try {
      await axios.delete(`https://tankwaaddis.onrender.com/sponser/${id}`);
      fetchSponsors(); // Refresh the list after deletion
    } catch (error) {
      console.error("Failed to delete sponsor:", error);
    }
  };

  // Filter sponsors based on the search term
  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight text-center">
        {t("sponsorsTitle")}
      </h1>

      {/* Search Bar */}
      <div className="mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder={t("searchSponsors")}
          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-gray-700 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display Sponsors */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSponsors.length > 0 ? (
          filteredSponsors.map((sponsor) => (
            <div
              key={sponsor._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={`https://tankwaaddis.onrender.com${sponsor.logo}`}
                  alt={sponsor.name}
                  className="w-full h-48 object-contain bg-gray-50 p-4 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                {/* Delete Button */}
                <button
                  onClick={() => deleteSponsor(sponsor._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-colors duration-200"
                  aria-label={t("deleteSponsor")}
                >
                  <FaTrash size={16} />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                  {sponsor.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {sponsor.description}
                </p>

                {/* Sponsor URL */}
                <div className="flex justify-center mb-4">
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                    aria-label={t("visitWebsite")}
                  >
                    {t("visitWebsite")}
                  </a>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-3">
                  {sponsor.twitter && (
                    <a
                      href={sponsor.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 transition-colors duration-200"
                      aria-label={t("twitterLink")}
                    >
                      <FaTwitter size={18} />
                    </a>
                  )}
                  {sponsor.facebook && (
                    <a
                      href={sponsor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      aria-label={t("facebookLink")}
                    >
                      <FaFacebook size={18} />
                    </a>
                  )}
                  {sponsor.instagram && (
                    <a
                      href={sponsor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                      aria-label={t("instagramLink")}
                    >
                      <FaInstagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-sm col-span-full">
            {t("noSponsorsFound", { searchTerm })}
          </p>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default SponsorPage;