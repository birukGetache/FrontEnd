import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [titles, setTitles] = useState({}); // Store titles for all languages
  const [descriptions, setDescriptions] = useState({}); // Store descriptions for all languages
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language is English
  const { id } = useParams();
  const [length , setLength] = useState(0);
  const [idI , setId] = useState("");
  const [public_id , setPublic_id] = useState("")
  const [visible , setVisible] = useState(false);

  // Fetch destinations based on the selected language
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(`https://tankwaaddis.onrender.com/destinations?language=${language}`);
        setDestinations(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDestinations();
  }, [language]);

  const handleEdit = (destination) => {
    setId(destination._id)
    setTitles(destination.titles || {});
    setDescriptions(destination.descriptions || {});
    setImage(destination.image); 
    setEditMode(true);
    setPublic_id(destination.public_id);
    setVisible(true)
  };
  

  // Fetch a specific destination when in edit mode
  useEffect(() => {
    if (id) {
      const fetchDestination = async () => {
        try {
          const res = await axios.get(`https://tankwaaddis.onrender.com/destinations/${id}`);
          setTitles(res.data.titles || {}); // Initialize titles
          setDescriptions(res.data.descriptions || {}); // Initialize descriptions
          setEditMode(true);
          setLength(res.data.descriptions.length)
        } catch (error) {
          console.error(error);
        }
      };
      fetchDestination();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titles', JSON.stringify(titles)); // Send all titles
    formData.append('descriptions', JSON.stringify(descriptions)); // Send all descriptions
    formData.append('language', language); // Current language
    // if (image) formData.append('image', image);
     formData.append('image', image);
     formData.append("public_id",public_id)
  console.log(editMode)
    try {
      if (editMode) {
        await axios.put(`https://tankwaaddis.onrender.com/destinations/${idI}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Destination updated successfully!');
      } else {
        await axios.post('https://tankwaaddis.onrender.com/destinations/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Destination uploaded successfully!');
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle destination deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tankwaaddis.onrender.com/destinations/${id}`);
      alert('Destination deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Change the selected language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Handle title change for the current language
  const handleTitleChange = (e) => {
    setTitles((prev) => ({
      ...prev,
      [language]: e.target.value, // Update title for the current language
    }));
  };

  // Handle description change for the current language
  const handleDescriptionChange = (e) => {
    setDescriptions((prev) => ({
      ...prev,
      [language]: e.target.value, // Update description for the current language
    }));
  };

  return (
    <div className="container w- mx-auto p-4 bg-white">
      <div className='absolute bottom-10 right-10 bg-slate-900 h-14 w-14 rounded-full text-3xl flex justify-center items-center'><button onClick={()=>setVisible(true)}>+</button></div>
   <p>you have {length} destinations</p>
  {visible &&
  <div className='w-full h-screen absolute top-0 bg-white flex justify-center  items-center gap-10 rounded-md overflow-hidden'>
    <button className='relative text-red-800 text-2xl' onClick={()=>setVisible(false)}>&times;</button>
    <div className='p-10 border-2 border-slate-900  flex gap-10'>
    <div className="space-y-4 p-6 bg-gray-100 rounded-md shadow-sm mb-8">
        <h1 className="text-blue-500">Language Settings</h1>
        <div className="space-y-2">
          {['en', 'am', 'sp', 'fr', 'ar'].map((lang) => (
            <label key={lang} className="flex items-center space-x-2">
              <input
                type="radio"
                name="language"
                value={lang}
                checked={language === lang}
                onChange={() => changeLanguage(lang)}
                className="text-slate-600 focus:ring-slate-300"
              />
              <span className="text-gray-800">
                {lang === 'en'
                  ? 'English'
                  : lang === 'am'
                  ? 'Amharic'
                  : lang === 'sp'
                  ? 'Spanish'
                  : lang === 'fr'
                  ? 'French'
                  : 'Arabic'}
              </span>
            </label>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={titles[language] || ''} // Display title for the current language
          onChange={handleTitleChange}
          className=" p-2 border rounded w-48"
        />
        <textarea
          placeholder="Description"
          value={descriptions[language] || ''} // Display description for the current language
          onChange={handleDescriptionChange}
          className=" p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className=" p-2 border rounded"
        />
        <button
          type="submit"
          className={`px-4 py-2 ${
            editMode ? 'bg-green-500' : 'bg-blue-500'
          } text-white rounded`}
        >
          {editMode ? 'Update Destination' : 'Upload Destination'}
        </button>
      </form>
    </div>  
  </div>
}

      {/* Display Destinations */}
      <div className="space-y-4 grid grid-cols-4 gap-10 place-items-center min-h-screen">
        {destinations.map((destination) => (
          <div key={destination._id} className="p-4 border rounded h-96">
            <img
              src={destination.image}
              alt={destination.titles?.[language] || 'Destination'} // Use optional chaining
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-xl h-8 font-bold text-slate-900">
              {destination.titles?.[language] || 'No Title'} {/* Use optional chaining */}
            </h2>
            <p className="text-slate-900 h-32 overflow-hidden">
              {destination.descriptions?.[language] || 'No Description'} {/* Use optional chaining */}
            </p>
            <div className="mt-2 space-x-2 h-10">
            <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={()=>handleEdit(destination)}>
  Edit
</button>

               
        
              <button
                onClick={() => handleDelete(destination._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;