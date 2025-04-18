"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { use } from 'react';
import TanaFotter from "../../components/TanaFotter"

export default function CardDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const cardId = unwrappedParams.id; 

  const allCards = [
    {
      id: "lake-tana-heritage",
      category: "LAKE TANA – HERITAGE & HISTORY",
      title: "Uncover Ancient Monasteries on Lake Tana",
      image: "/LakeTana.png",
      description: "Journey through the sacred islands of Lake Tana, home to centuries-old Ethiopian Orthodox monasteries and cultural treasures.",
      moreInfo: "Explore hidden island monasteries filled with ancient manuscripts, vibrant frescoes, and spiritual significance. A cultural voyage through Ethiopia's spiritual past and vibrant present.",
      highlights: [
        "Visits to island monasteries (Ura Kidane Mehret, Tana Cherkos)",
        "Traditional boat rides on Lake Tana",
        "Guided tours with local historians",
        "Explore ancient religious art and manuscripts",
        "Cultural immersion in lakeside villages"
      ],
      duration: "2-4 days",
      locations: ["Zege Peninsula", "Tana Cherkos Island", "Bahir Dar", "Dek Island"],
      rating: 4.8,
      reviews: 102,
      price: "From 750 Birr",
      gallery: [
        "/LakeTana.png",
        "/MonastryWall.png",
        "/IslandBoatTour.png"
      ]
    },   
    {
      id: "Nile",
      category: "NILE ESCAPES – CULTURE & WELLNESS",
      title: "Kato Dool Wellness Resort",
      image: "/Fall.png",
      description: "Experience holistic well-being at the heart of Nubian culture along the serene Nile River in Aswan.",
      moreInfo: "Immerse yourself in traditional Nubian hospitality, organic cuisine, and meditative spaces with breathtaking river views. A perfect fusion of culture and wellness.",
      highlights: [
        "Riverfront wellness suites",
        "Traditional Nubian meals",
        "Yoga and meditation retreats",
        "Cultural workshops & boat tours",
        "Eco-friendly and sustainable stay"
      ],
      duration: "3-7 days",
      locations: ["Aswan", "Nubian Village", "Elephantine Island"],
      rating: 4.9,
      reviews: 87,
      price: "From 650 Birr",
      gallery: [
        "/Fall.png",
        "/Horizon.png",
        "/ImageSide.png"
      ]
    },   
    {
      id: "lake-tana-biodiversity",
      category: "BIO DIVERSITY",
      title: "Tana's Biodiversity Treasures",
      image: "/Hipopotamous.png",
      description: "Explore the rich biodiversity of Lake Tana, home to unique ecosystems, endemic species, and a delicate balance of life nurtured by Ethiopia's largest lake.",
      moreInfo: "Lake Tana is a biodiversity hotspot, hosting over 20 endemic fish species, rare birds, papyrus wetlands, and aquatic mammals like hippos. The lake's islands and surrounding wetlands provide vital habitats for migratory birds and are crucial for ecological research and conservation efforts.",
      highlights: [
        "Endemic fish and aquatic life",
        "Papyrus wetlands & birdwatching",
        "Home to hippos and aquatic mammals",
        "Vital stop for migratory birds",
        "Ecological research and conservation projects"
      ],
      duration: "1-3 day eco tours",
      locations: ["Zege Peninsula", "Dek Island", "Bahir Dar Wetlands", "Blue Nile Outflow"],
      rating: 4.9,
      reviews: 89,
      price: "From 120 Birr",
      gallery: [
        "/Hipopotamous.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Pelicans_on_the_lake_Tana%2C_Ethiopia.jpg/1280px-Pelicans_on_the_lake_Tana%2C_Ethiopia.jpg",
        "/LakeTanaFish.png"
      ]
    }
  ];

  const card = allCards.find((item) => item.id === cardId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Experience not found</h2>
          <p className="mb-6 text-gray-600">The requested experience could not be found.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-md">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === card.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? card.gallery.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition font-medium">
            <FaArrowLeft className="mr-2" /> Back to all experiences
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Image Header */}
          <div className="relative h-96 w-full group">
            <Image 
              src={card.gallery[currentImage]} 
              alt={card.title} 
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="inline-block px-3 py-1 bg-white text-sm font-medium rounded-full mb-2 shadow-md">
                {card.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{card.title}</h1>
              <div className="mt-2 flex items-center">
                <span className="text-xl font-bold text-white bg-blue-600 px-3 py-1 rounded-md">
                  {card.price}
                </span>
              </div>
            </div>
            
            {/* Image Navigation */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {card.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight className="text-xl" />
            </button>
            
            {/* Favorite Button */}
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 bg-white/90 rounded-full hover:bg-white transition shadow-lg transform hover:scale-110"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-700 text-xl hover:text-red-500" />
              )}
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="md:w-2/3">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{card.rating}</span>
                    <span className="text-gray-500 ml-1">({card.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <FaMapMarkerAlt className="text-blue-500 mr-1" />
                    <span>{card.locations.join(", ")}</span>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                    <FaCalendarAlt className="text-blue-500 mr-1" />
                    <span>{card.duration}</span>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{card.description}</p>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Experience Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {card.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start bg-blue-50/50 hover:bg-blue-50 transition p-3 rounded-lg">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/30 p-6 rounded-lg mb-8 border border-blue-100">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">More Information</h3>
                  <p className="text-gray-700 leading-relaxed">{card.moreInfo}</p>
                </div>

                {/* Gallery Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {card.gallery.map((imgSrc, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImage(index)}
                        className="relative h-40 rounded-lg overflow-hidden hover:opacity-90 transition transform hover:-translate-y-1 shadow-md"
                      >
                        <Image 
                          src={imgSrc} 
                          alt={`${card.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {currentImage === index && (
                          <div className="absolute inset-0 border-2 border-blue-500 rounded-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Experience Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-500">Duration</h4>
                        <p className="text-gray-700">{card.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500">Locations</h4>
                        <ul className="text-gray-700">
                          {card.locations.map((location, index) => (
                            <li key={index} className="flex items-start mb-1">
                              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                              {location}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500">Price</h4>
                        <p className="text-2xl font-bold text-blue-600">{card.price}</p>
                      </div>
                    </div>
                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition transform hover:-translate-y-1 shadow-md">
                      Book Now
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Why Choose This Experience?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Authentic cultural immersion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Expert local guides</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Sustainable tourism practices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Unique access to hidden gems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <TanaFotter />
    </div>
  );
}