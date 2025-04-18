import React, { useState, useEffect } from "react";
import axios from "axios";

const BoatOwner = () => {
  const [availability, setAvailability] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const handleToggle = (newAvailability , id) => {
    setAvailability(newAvailability);
    setIsEditing(false);
    axios.put(`https://tankwaaddis.onrender.com/boatowners/availability/${id}`, { availability: newAvailability });
  };

  const [boatOwners, setBoatOwners] = useState([]);
  const [visible , setVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    middleName: "",
    phone: "",
    id: "",
  });

  // Fetch boat owners data
  const fetchBoatOwners = async () => {
    try {
      const response = await axios.get("https://tankwaaddis.onrender.com/boatowners");
      setBoatOwners(response.data);
      setAvailability(response.data.availability)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching boat owners:", error);
    }
  };

  useEffect(() => {
    fetchBoatOwners();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Create or Update boat owner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing boat owner
      await axios.put(`https://tankwaaddis.onrender.com/boatowners/${formData.id}`, formData);
    } else {
      // Create new boat owner
      await axios.post("https://tankwaaddis.onrender.com/boatowners", formData);
    }
    setFormData({
      name: "",
      fatherName: "",
      middleName: "",
      phone: "",
      id: "",
    });
    fetchBoatOwners();
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`https://tankwaaddis.onrender.com/boatowners/${id}`);
    fetchBoatOwners();
  };

  // Handle edit
  const handleEdit = (owner) => {
    setVisible(true)
    setFormData({
      name: owner.name,
      fatherName: owner.fatherName,
      middleName: owner.middleName,
      phone: owner.phone,
      id: owner._id,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {visible && <div className=" mx-auto bg-white  overflow-hidden rounded-lg shadow-lg max-w-80">
        <div className="px-6 py-4 border-b border-gray-200 relative ">
          <span className="text-red-700 absolute top-10 right-10 cursor-pointer text-2xl" onClick={()=>setVisible(false)}>&times;</span>
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Boat Owner Management</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name:</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled
              visiblility="hidden"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit
          </button>
        </form>
      </div>}

    {!visible &&
    <>
    <div className="max-w-4xl mx-auto mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Boat Owners List</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Father Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Middle Name</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
          <th className="text-left py-3 px-4 font-semibold text-gray-700">availabity</th>
        </tr>
      </thead>
      <tbody>
        {boatOwners.map((owner) => (
          <tr key={owner._id} className="border-b">
            <td className="py-3 px-4 text-gray-800">{owner.name}</td>
            <td className="py-3 px-4 text-gray-800">{owner.fatherName}</td>
            <td className="py-3 px-4 text-gray-800">{owner.middleName}</td>
            <td className="py-3 px-4 text-gray-800">{owner.phone}</td>
            <td className="py-3 px-4">
              <button
                onClick={() => handleEdit(owner)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(owner._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Delete
              </button>
            </td>
            <tr>
      <td className="py-3 px-4 text-gray-800 cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? (
          <div className="relative">
            <button
              className="text-green-500 hover:text-green-700"
              onClick={() => handleToggle(true , owner._id)}
            >
              Available
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleToggle(false , owner._id)}
            >
              Unavailable
            </button>
          </div>
        ) : (
          availability ? 'Available' : 'Unavailable'
        )}
      </td>
    </tr>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      <div className="absolute bottom-10 right-10 bg-slate-400 p-4 w-16 h-16 rounded-full flex justify-center items-center">
      <button className="text-blue-800 text-4xl hover:text-blue-600 hover:scale-125 transition-transform duration-200 cursor-pointer" onClick={()=>setVisible(true)}>+</button>
      </div>
      </>
}
    
    </div>
  );
};

export default BoatOwner;