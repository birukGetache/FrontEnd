"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TanaFooter from '../components/TanaFotter';

const GalleryPage = () => {
  const [slides] = useState([
    {
      id: 1,
      name: "Lake Tana at Sunset",
      category: "nature",
      description: "Witness the breathtaking sunset over Lake Tana, Ethiopia's largest lake and the source of the Blue Nile. The golden hues reflecting on the water create a magical atmosphere that attracts photographers and nature lovers alike. The lake is home to 37 islands, many of which host ancient monasteries and churches dating back to the 13th century.",
      imageUrl: "/TanaNight.png",
      bestTime: "October to February",
      location: "Bahir Dar, Amhara Region"
    },
    {
      id: 2,
      name: "African Jacana on Lake Tana",
      category: "nature",
      description: "The African Jacana, locally known as 'Jesus Bird' for its ability to walk on floating vegetation, is a common sight on Lake Tana. This wetland ecosystem supports over 200 bird species, making it a paradise for birdwatchers. The lake's papyrus reeds provide perfect habitat for these elegant birds with their distinctive long toes.",
      imageUrl: "/TanaDuck.png",
      bestTime: "Year-round, best in dry season (Oct-May)",
      location: "Lake Tana Wetlands"
    },
    {
      id: 3,
      name: "Dek Island Fishermen",
      category: "culture",
      description: "Traditional fishermen on Dek Island, the largest island in Lake Tana, continue centuries-old fishing practices using papyrus reed boats called 'tankwas'. These sustainable fishing methods have been passed down through generations and offer a glimpse into the authentic rural life of Ethiopia's lake communities.",
      imageUrl: "/Dek.png",
      bestTime: "Morning hours for fishing activities",
      location: "Dek Island, Lake Tana"
    },
    {
      id: 4,
      name: "Ethiopian Paradise Flycatcher",
      category: "nature",
      description: "The vibrant Ethiopian Paradise Flycatcher, endemic to the Lake Tana region, showcases Ethiopia's remarkable avian biodiversity. With its striking plumage and graceful flight, this bird is a favorite among ornithologists visiting the area. The lake's surrounding forests provide crucial habitat for this and many other endemic species.",
      imageUrl: "/TanaBird.png",
      bestTime: "Breeding season (March-June)",
      location: "Lake Tana Biosphere Reserve"
    },
    {
      id: 5,
      name: "Nile Perch from Lake Tana",
      category: "culture",
      description: "The Nile Perch, locally known as 'Amhar', is a prized catch for Lake Tana fishermen. This fish plays a vital role in the local economy and cuisine. Traditional fish markets around the lake offer fresh catches daily, and visitors can enjoy delicious preparations at lakeside restaurants in Bahir Dar.",
      imageUrl: "/TanaFish.png",
      bestTime: "Early morning at fish markets",
      location: "Bahir Dar Fish Market"
    },
    {
      id: 6,
      name: "Ura Kidane Mihret Monastery",
      category: "culture",
      description: "The 14th-century Ura Kidane Mihret monastery on the Zege Peninsula is renowned for its spectacular circular wall paintings depicting biblical scenes. This sacred site houses priceless religious artifacts and offers insight into Ethiopia's ancient Christian traditions. The walk through coffee forests to reach the monastery is equally enchanting.",
      imageUrl: "/TanaBible.png",
      bestTime: "September to April",
      location: "Zege Peninsula, Lake Tana"
    },
    {
      id: 7,
      name: "Dega Estifanos Monastery",
      category: "culture",
      description: "Dega Estifanos, one of Lake Tana's most sacred island monasteries, is said to house the Ark of the Covenant replica and mummified remains of ancient Ethiopian emperors. The monastery's museum displays centuries-old illuminated manuscripts, royal crowns, and religious artifacts that survived various invasions.",
      imageUrl: "/DegaEstifanos.jpg",
      bestTime: "Religious festivals (Timkat in January)",
      location: "Dega Island, Lake Tana"
    },
    {
      id: 8,
      name: "Blue Nile Falls",
      category: "nature",
      description: "Known locally as 'Tis Issat' (Smoking Water), the Blue Nile Falls are most spectacular during the rainy season (June-September) when the water plunges 45 meters in a thunderous display. The surrounding area offers beautiful hiking trails with panoramic views of the Nile Gorge and opportunities to see local wildlife.",
      imageUrl: "/NileFalls.jpg",
      bestTime: "July to September (peak flow)",
      location: "30km from Bahir Dar"
    }
  ]);

  const [selectedSlide, setSelectedSlide] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredSlides = filter === 'all' 
    ? slides 
    : slides.filter(slide => slide.category === filter);

  return (
    <div className="h-fit bg-white">
      
      <header className="relative bg-cover bg-center h-fit" style={{ backgroundImage: "url('/ethiopia-banner.jpg')" }}>
        <div className=" bg-white bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">Ethiopian Treasures</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Journey through the natural wonders and cultural heritage of Lake Tana, the source of the Blue Nile</p>
            <Link href="/" className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className=" bg-white p-4 box-border w-screen py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Explore Lake Tana's Wonders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lake Tana, Ethiopia's largest lake and the source of the Blue Nile, offers a unique blend of natural beauty and cultural heritage. Our gallery showcases the region's ancient monasteries, diverse wildlife, and stunning landscapes that have captivated visitors for centuries.
          </p>
        </section>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-700">Filter by Category:</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-full shadow-md">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition ${filter === 'all' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
            >
              All Treasures
            </button>
            <button 
              onClick={() => setFilter('nature')}
              className={`px-4 py-2 rounded-full transition ${filter === 'nature' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Natural Wonders
            </button>
            <button 
              onClick={() => setFilter('culture')}
              className={`px-4 py-2 rounded-full transition ${filter === 'culture' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Cultural Heritage
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 bg-white lg:grid-cols-3 gap-8">
          {filteredSlides.map((slide) => (
            <div 
              key={slide.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => setSelectedSlide(slide)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={slide.imageUrl} 
                  alt={slide.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className=" bg-gradient-to-t from-white/70 to-transparent flex items-end p-6">
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                      slide.category === 'nature' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {slide.category === 'nature' ? 'Natural Wonder' : 'Cultural Heritage'}
                    </span>
                    <h3 className="text-white text-xl font-bold">{slide.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2">{slide.description}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {slide.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedSlide && (
          <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setSelectedSlide(null)}
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10 transition"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
                      selectedSlide.category === 'nature' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedSlide.category === 'nature' ? 'Natural Wonder' : 'Cultural Heritage'}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedSlide.location}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedSlide.name}</h2>
                  <p className="text-gray-600 mb-6">{selectedSlide.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                        <p className="text-gray-600">{selectedSlide.bestTime}</p>
                      </div>
                    </div>
                    
                    {selectedSlide.category === 'culture' && (
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-gray-800">Cultural Significance</h4>
                          <p className="text-gray-600">
                            {selectedSlide.name.includes('monastery') 
                              ? "This sacred site has been a center of religious learning and pilgrimage for centuries, preserving Ethiopia's ancient Christian traditions."
                              : "Represents traditional practices that have been maintained for generations, offering authentic cultural experiences."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
                    <h3 className="font-bold text-amber-800 mb-2">Traveler's Tip</h3>
                    <p className="text-amber-700">
                      {selectedSlide.category === 'nature' 
                        ? "Consider hiring a local guide who can point out unique flora and fauna you might otherwise miss. Early mornings often provide the best wildlife viewing opportunities." 
                        : "Dress modestly when visiting religious sites (shoulders and knees covered). Ask permission before photographing people, especially during religious ceremonies."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

     
        <TanaFooter />
      </main>

  
    </div>
  );
};

export default GalleryPage;