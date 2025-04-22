import React, { useState, useEffect } from "react";
import axios from "axios";
import BoatOwnerTable from "@components/BoatOwner/BoatOwnerTable"
import BoatOwnerHandlerForm from "@components/BoatOwner/BoatOwnerForm"

const BoatOwner = () => {
  const [availability, setAvailability] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const handleToggle = (newAvailability , id) => {
    setAvailability(newAvailability);
    setIsEditing(false);
    axios.put(`http://localhost:5000/boatowners/${id}`, 
      { availability: newAvailability }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(response => {
      console.log('Update successful:', response.data);
    })
    .catch(error => {
      console.error('Error updating availability:', error.response?.data || error.message);
    });
    
  };


  const token = localStorage.getItem("authToken");


  const [boatOwners, setBoatOwners] = useState([]);
  const [visible , setVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    middleName: "",
    phone: "",
    id: "",
    image: null,
  });
  

  // Fetch boat owners data
  const fetchBoatOwners = async () => {
    try {
     const response = await axios.get("http://localhost:5000/boatowners");
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
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("fatherName", formData.fatherName);
    data.append("middleName", formData.middleName);
    data.append("phone", formData.phone);
  
    // Only include the image if it's a new file
    if (formData.image) {
      data.append("image", formData.image);
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      if (formData.id) {
        await axios.put(
          `http://localhost:5000/boatowners/${formData.id}`,
          data,
          config
        );
      } else {
        await axios.post("http://localhost:5000/boatowners", data, config);
      }
  
      setFormData({
        name: "",
        fatherName: "",
        middleName: "",
        phone: "",
        id: "",
        image: null,
        imageUrl: "",
      });
    console.log("woh")
      fetchBoatOwners();
      setVisible(false); // Close form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  // Handle delete
  const handleDelete = async (id) => {
   const res= await axios.delete(`http://localhost:5000/boatowners/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
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

  const tableProps = {
    boatOwners,
    handleEdit,
    handleDelete,
    setIsEditing,
    isEditing,
    handleToggle,
    availability
  };

  const formProps = {
    setVisible,
    handleInputChange,
    handleSubmit,
    formData,
    setFormData
  }


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {visible &&
     <BoatOwnerHandlerForm {...formProps}></BoatOwnerHandlerForm>}

    {!visible &&
    <>
<BoatOwnerTable {...tableProps} />;

      <div className="absolute bottom-10 right-10 bg-slate-400 p-4 w-16 h-16 rounded-full flex justify-center items-center">
      <button className="text-blue-800 text-4xl hover:text-blue-600 hover:scale-125 transition-transform duration-200 cursor-pointer" onClick={()=>setVisible(true)}>+</button>
      </div>
      </>
}
    
    </div>
  );
};

export default BoatOwner;