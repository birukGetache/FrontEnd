"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { use } from 'react';
export default function CardDetailsPage({ params }) {
  // Properly handle the params Promise
  const unwrappedParams = use(params); // 👈 Unwrap the Promise
const cardId = unwrappedParams.id; 

  const allCards = [
{
  id: "lake-tana-heritage",
  category: "LAKE TANA – HERITAGE & HISTORY",
  title: "Uncover Ancient Monasteries on Lake Tana",
  image: "/LakeTana.png",
  description: "Journey through the sacred islands of Lake Tana, home to centuries-old Ethiopian Orthodox monasteries and cultural treasures.",
  moreInfo: "Explore hidden island monasteries filled with ancient manuscripts, vibrant frescoes, and spiritual significance. A cultural voyage through Ethiopia’s spiritual past and vibrant present.",
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
        description: "Explore the rich biodiversity of Lake Tana, home to unique ecosystems, endemic species, and a delicate balance of life nurtured by Ethiopia’s largest lake.",
        moreInfo: "Lake Tana is a biodiversity hotspot, hosting over 20 endemic fish species, rare birds, papyrus wetlands, and aquatic mammals like hippos. The lake’s islands and surrounding wetlands provide vital habitats for migratory birds and are crucial for ecological research and conservation efforts. Protecting Lake Tana’s biodiversity supports not only the environment but also local livelihoods and traditional practices.",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Experience not found</h2>
          <p className="mb-6">The requested experience could not be found.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
            <FaArrowLeft className="mr-2" /> Back to all experiences
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Header */}
          <div className="relative h-96 w-full">
            <Image 
              src={card.gallery[currentImage]} 
              alt={card.title} 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span className="inline-block px-3 py-1 bg-white text-sm font-medium rounded-full mb-2">
                {card.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{card.title}</h1>
            </div>
            
            {/* Image Navigation */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {card.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${currentImage === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Favorite Button */}
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-700 text-xl" />
              )}
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="md:w-2/3">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{card.rating}</span>
                    <span className="text-gray-500 ml-1">({card.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-400 mr-1" />
                    <span>{card.locations.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-1" />
                    <span>{card.duration}</span>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-6">{card.description}</p>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Experience Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {card.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-3">More Information</h3>
                  <p className="text-gray-700">{card.moreInfo}</p>
                </div>

                {/* Gallery Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {card.gallery.map((imgSrc, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImage(index)}
                        className="relative h-40 rounded-lg overflow-hidden hover:opacity-90 transition"
                      >
                        <Image 
                          src={imgSrc} 
                          alt={`${card.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="sticky top-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Experience Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-500">Duration</h4>
                        <p>{card.duration}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-500">Locations</h4>
                        <ul className="list-disc list-inside">
                          {card.locations.map((location, index) => (
                            <li key={index}>{location}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-500">Price</h4>
                        <p className="text-2xl font-bold text-blue-600">{card.price}</p>
                        <p className="text-sm text-gray-500">per person</p>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition">
                        Book Now
                      </button>
                      
                      <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition">
                        Contact for Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-2 flex items-center">
                      <FaStar className="text-yellow-400 mr-2" />
                      Traveler Reviews
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`${i < Math.floor(card.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{card.rating} out of 5</span>
                    </div>
                    <p className="text-sm text-gray-600">Based on {card.reviews} traveler reviews</p>
                    <button className="mt-4 text-blue-600 hover:underline text-sm font-medium">
                      Read all reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience {card.title}?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Book your journey today and create unforgettable memories.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition">
              Book Now
            </button>
            <button className="border-2 border-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}