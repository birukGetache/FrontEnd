"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [visible , setVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
    const [public_id , setPublicId] = useState("")
    const [editId, setEditId] = useState(null);

    
    const handleEdit = (blog) => {
      setPublicId(blog.public_id)
      setEditId(blog._id);
     setTitle(blog.title)
     setDescription(blog.description)
    setImage(blog.imageUrl)
    };




  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(()=>{
    const fetchData= async ()=>{
      const response = await axios.get("https://tankwaaddis.onrender.com/api/blogs");
      setBlogs(response.data)
    }

    fetchData();
   
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    
    // Log the form data before appending image
   
     data.append('public_id', public_id);
     console.log("public_id" , public_id)
    data.append("image",image)
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Image:", image);
    try {
      let response;
      if (editId) {
  

console.log(data)

        response = await axios.put(`https://tankwaaddis.onrender.com/api/blogs/${editId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        console.log("FormData for new blog:", data);
        response = await axios.post("https://tankwaaddis.onrender.com/api/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      setBlogs([...blogs, response.data]);
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Failed to post blog:", error);
    }
  };
  
  const handleDelete = async (e , id) =>{
    e.preventDefault();
    const response = await axios.delete(`https://tankwaaddis.onrender.com/api/blogs/${id}`);
    console.log(response.data.message)

  }
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
     {visible &&
     <>
    <h1 className="text-3xl font-bold text-slate-500 text-center mb-6">Post a Blog</h1>  

      <form
        className="max-w-lg mx-auto relative bg-white p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
            <span className="text-red-700 absolute top-5 right-10 cursor-pointer text-2xl" onClick={()=>setVisible(false)}>&times;</span>
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter blog description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>
      </>
      }

      {!visible && <>
      <h2 className="text-2xl font-bold text-slate-500 text-center mt-8 mb-4">Blogs</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.description}</p>
            <div class="flex space-x-2">
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md shadow-md transition duration-300"    onClick={() => handleEdit(blog)}>
    Edit
  </button>
  <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md shadow-md transition duration-300"   onClick={(e) => handleDelete(e, blog._id)}>
    Delete
  </button>
</div>
          </div>
        ))}
         <div className="absolute bottom-10 right-10 bg-slate-400 p-4 w-16 h-16 rounded-full flex justify-center items-center">
      <button className="text-blue-800 text-4xl hover:text-blue-600 hover:scale-125 transition-transform duration-200 cursor-pointer" onClick={()=>setVisible(true)}>+</button>
      </div>
      </div>
      </>}
    </div>
  );
}
