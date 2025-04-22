import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Language selector component
const LanguageSelector = ({ language, onChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'Amharic' },
    { code: 'sp', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' }
  ];

  return (
    <div className="space-y-2 mb-6">
      <h2 className="text-lg font-semibold text-gray-700">Select Language</h2>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <label key={lang.code} className="inline-flex items-center">
            <input
              type="radio"
              name="language"
              value={lang.code}
              checked={language === lang.code}
              onChange={() => onChange(lang.code)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{lang.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Destination form component
const DestinationForm = ({
  visible,
  setVisible,
  editMode,
  handleSubmit,
  titles,
  descriptions,
  handleTitleChange,
  handleDescriptionChange,
  language,
  setImage,
  setPrice,
  price
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editMode ? 'Edit Destination' : 'Add New Destination'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <LanguageSelector language={language} onChange={(lang) => language = lang} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="Destination title"
                value={titles[language] || ''}
                onChange={handleTitleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Destination description"
                value={descriptions[language] || ''}
                onChange={handleDescriptionChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
                accept="image/*"
                required={!editMode}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
           
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-green-800 Birr{editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {editMode ? 'Update Destination' : 'Add Destination'}
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Destination card component
const DestinationCard = ({ destination, language, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.titles?.[language] || 'Destination'}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {destination.titles?.[language] || 'No Title'}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {destination.descriptions?.[language] || 'No Description'}
        </p>
        <div className="mt-auto">
          <p className="text-blue-600 font-medium">Birr{destination.price}</p>
        </div>
      </div>
      
      <div className="px-4 pb-4 flex space-x-2">
        <button
          onClick={() => handleEdit(destination)}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(destination._id)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main Destinations component
const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [titles, setTitles] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [length, setLength] = useState(0);
  const [idI, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [public_id, setPublic_id] = useState("");
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  // Fetch destinations based on the selected language
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/destinations?language=${language}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDestinations(res.data);
        setLength(res.data.length);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, [language, token]);

  // Fetch a specific destination when in edit mode
  useEffect(() => {
    if (id) {
      const fetchDestination = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/destinations/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTitles(res.data.titles || {});
          setDescriptions(res.data.descriptions || {});
          setPrice(res.data.price || 0);
          setEditMode(true);
          setVisible(true);
        } catch (error) {
          console.error("Error fetching destination:", error);
        }
      };
      fetchDestination();
    }
  }, [id, token]);

  const handleEdit = (destination) => {
    setId(destination._id);
    setTitles(destination.titles || {});
    setDescriptions(destination.descriptions || {});
    setImage(destination.image);
    setPrice(destination.price || 0);
    setEditMode(true);
    setPublic_id(destination.public_id);
    setVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titles', JSON.stringify(titles));
    formData.append('descriptions', JSON.stringify(descriptions));
    formData.append('language', language);
    formData.append('image', image);
    formData.append('price', price);
    formData.append("public_id", public_id);

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/destinations/${idI}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        });
      } else {
        await axios.post('http://localhost:5000/destinations/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await axios.delete(`http://localhost:5000/destinations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting destination:", error);
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitles((prev) => ({
      ...prev,
      [language]: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setDescriptions((prev) => ({
      ...prev,
      [language]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Destinations</h1>
          <p className="text-gray-600">{length} destinations available</p>
        </div>
        <button
          onClick={() => {
            setEditMode(false);
            setTitles({});
            setDescriptions({});
            setImage(null);
            setPrice(0);
            setVisible(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span className="mr-2">+</span> Add Destination
        </button>
      </div>

      <LanguageSelector language={language} onChange={setLanguage} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
            language={language}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <DestinationForm
        visible={visible}
        setVisible={setVisible}
        editMode={editMode}
        handleSubmit={handleSubmit}
        titles={titles}
        descriptions={descriptions}
        handleTitleChange={handleTitleChange}
        handleDescriptionChange={handleDescriptionChange}
        language={language}
        setImage={setImage}
        setPrice={setPrice}
        price={price}
      />
    </div>
  );
};

export default Destinations;