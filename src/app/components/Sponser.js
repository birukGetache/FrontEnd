import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SponsorManagementPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [visible , setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    url: '',
    description: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });
  const [logo , setLogo] = useState("");
  const [public_id , setPublicId] = useState("")
  const [editId, setEditId] = useState(null); // Track sponsor being edited

  // Fetch all sponsors
  const fetchSponsors = async () => {
    try {
      const response = await axios.get('https://tankwaaddis.onrender.com/sponser');
    
      setSponsors(response.data);
  
      console.log(response.data)
    } catch (err) {
      console.error('Failed to fetch sponsors', err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };
  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);
  

  // Handle form submission for adding or updating sponsors
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("we are here please rreach out")
    const data = new FormData();
    console.log(formData)
    data.append('name', formData.name);
    if (formData.logo) {
      console.log(logo)
      data.append('logo', formData.logo);  // Add the new file to FormData
    }
    else{
      console.log(logo)
      data.append("logo" , logo)
    }
    data.append('url', formData.url);
    data.append('description', formData.description);
    data.append('twitter', formData.twitter);
    data.append('facebook', formData.facebook);
    data.append('instagram', formData.instagram);
    try {
      if (editId) {
        data.append('public_id', public_id); // ✅ append it to FormData
  await axios.put(`https://tankwaaddis.onrender.com/sponser/${editId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
      } else {
        // Add new sponsor
        await axios.post('https://tankwaaddis.onrender.com/sponser', data);
      }
      fetchSponsors(); // Refresh sponsor list
      setFormData({
        name: '',
        logo: null,
        url: '',
        description: '',
        twitter: '',
        facebook: '',
        instagram: ''
      });
      setEditId(null);
    } catch (err) {
      console.error('Failed to save sponsor', err);
    }
  };

  // Edit a sponsor
  const handleEdit = (sponsor) => {
    console.log(sponsor)
    setPublicId(sponsor.public_id)
    setEditId(sponsor._id);
    setFormData({
      name: sponsor.name,
      logo: null, // Set to null since we don't have the file
      url: sponsor.url,
      description: sponsor.description,
      twitter: sponsor.twitter,
      facebook: sponsor.facebook,
      instagram: sponsor.instagram
    });
    setLogo(sponsor.logo)
 
  };

  // Delete a sponsor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tankwaaddis.onrender.com/sponser/${id}`);
      fetchSponsors();
    } catch (err) {
      console.error('Failed to delete sponsor', err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
     {visible &&
      <form className="bg-white p-6 rounded-lg shadow-lg mb-10" onSubmit={handleFormSubmit}>
        <h2 className="text-2xl font-semibold mb-4">{editId ? 'Edit Sponsor' : 'Add Sponsor'}</h2>
        <span className="text-red-700 absolute top-10 right-10 cursor-pointer text-2xl" onClick={()=>setVisible(false)}>&times;</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="p-2 border rounded"
         //   required={!editId} // Only required for new sponsors
          />
          <input
            type="text"
            name="url"
            placeholder="Website URL"
            value={formData.url}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={formData.twitter}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            value={formData.instagram}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Sponsor' : 'Add Sponsor'}
        </button>
      </form>
}

     {!visible &&
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="absolute bottom-10 right-10 bg-slate-400 p-4 w-16 h-16 rounded-full flex justify-center items-center">
      <button className="text-blue-800 text-4xl hover:text-blue-600 hover:scale-125 transition-transform duration-200 cursor-pointer" onClick={()=>setVisible(true)}>+</button>
      </div>
        {sponsors.map((sponsor) => (
          <div key={sponsor._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{sponsor.name}</h3>
            <img src={`${sponsor.logo}`} alt={sponsor.name} className="w-24 h-24 object-contain mb-2" />
            <p className="text-gray-600 text-sm mb-2">{sponsor.description}</p>
            <div className="flex space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(sponsor)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(sponsor._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default SponsorManagementPage;
