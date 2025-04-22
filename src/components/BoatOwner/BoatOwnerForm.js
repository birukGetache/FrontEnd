import Image from "next/image";
const BoatOwnerForm = ({setVisible , handleInputChange , handleSubmit , formData , setFormData}) =>{
    return(
        <div className=" mx-auto bg-white  overflow-hidden rounded-lg shadow-lg max-w-80">
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
          <div className="mb-4">
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
  
  {formData.image || formData.imageUrl ? (
    <div className="mb-2">
      <Image
        src={
          typeof formData.image === "object"
            ? URL.createObjectURL(formData.image) // Preview of new file
            : formData.imageUrl // Existing image from DB
        }
        alt="Preview"
        width={100}
        height={100}
        className="rounded border border-gray-300 shadow"
      />
    </div>
  ) : null}

  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={(e) =>
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0], // Set new file
      }))
    }
    className="mt-1 block w-full"
  />
</div>


          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit
          </button>
        </form>
      </div>
    )
}

export default BoatOwnerForm;