import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';

const SponsorManagementPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    url: '',
    description: '',
    twitter: '',
    facebook: '',
    instagram: '',
    isPublished: false
  });
  const [logo, setLogo] = useState("");
  const [public_id, setPublicId] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("authToken");

  const fetchSponsors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sponser', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSponsors(response.data);
    } catch (err) {
      console.error('Failed to fetch sponsors', err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    formData.logo ? data.append('logo', formData.logo) : data.append('logo', logo);
    data.append('url', formData.url);
    data.append('description', formData.description);
    data.append('twitter', formData.twitter);
    data.append('facebook', formData.facebook);
    data.append('instagram', formData.instagram);
    data.append('isPublished', formData.isPublished);

    try {
      if (editId) {
        data.append('public_id', public_id);
        await axios.put(`http://localhost:5000/sponser/${editId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:5000/sponser', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchSponsors();
      resetForm();
    } catch (err) {
      console.error('Failed to save sponsor', err);
    }
  };

  const handleEdit = (sponsor) => {
    setPublicId(sponsor.public_id);
    setEditId(sponsor._id);
    setFormData({
      name: sponsor.name,
      logo: null,
      url: sponsor.url,
      description: sponsor.description,
      twitter: sponsor.twitter,
      facebook: sponsor.facebook,
      instagram: sponsor.instagram,
      isPublished: sponsor.isPublished
    });
    setLogo(sponsor.logo);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sponser/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSponsors();
    } catch (err) {
      console.error('Failed to delete sponsor', err);
    }
  };

  const togglePublish = async (id, currentStatus) => {
    console.log(id)
    // try {
    //   await axios.patch(`http://localhost:5000/sponser/${id}`, 
    //     { isPublished: !currentStatus },
    //     { headers: { Authorization: `Bearer ${token}` }
    //   );
    //   fetchSponsors();
    // } catch (err) {
    //   console.error('Failed to update publish status', err);
    // }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo: null,
      url: '',
      description: '',
      twitter: '',
      facebook: '',
      instagram: '',
      isPublished: false
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Sponsor Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
          >
            <FaPlus className="mr-1" /> Add Sponsor
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 relative">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? 'Edit Sponsor' : 'Add Sponsor'}
            </h2>
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="w-full p-1 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Published</label>
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  {editId ? 'Update Sponsor' : 'Add Sponsor'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sponsors.map((sponsor) => (
                <tr key={sponsor._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-10 object-contain" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sponsor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {sponsor.url}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sponsor.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {sponsor.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => togglePublish(sponsor._id, sponsor.isPublished)}
                        className="text-gray-600 hover:text-gray-900"
                        title={sponsor.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        {sponsor.isPublished ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => handleEdit(sponsor)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(sponsor._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SponsorManagementPage;