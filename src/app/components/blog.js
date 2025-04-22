"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "@components/Blog/BlogList"
import BlogForm from "@components/Blog/BlogForm"
export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [visible , setVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
    const [public_id , setPublicId] = useState("")
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("authToken");
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
      const response = await axios.get("http://localhost:5000/api/blogs");
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

        response = await axios.put(`http://localhost:5000/api/blogs/${editId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        });
      } else {
        console.log("FormData for new blog:", data);
        response = await axios.post("http://localhost:5000/api/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" ,
                       Authorization: `Bearer ${token}`, },
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
    const response = await axios.delete(`http://localhost:5000/api/blogs/${id}` , {
      Authorization: `Bearer ${token}`,
    });
    console.log(response.data.message)

  }
  const publishHandler = () =>{
    console.log("published")
  }
  
  const blogFormHandle ={handleSubmit,setDescription,title, setTitle,description,handleImageChange, setVisible}
  const blogTableHandle = {handleDelete ,handleEdit, blogs , setVisible , publishHandler}
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
     {visible &&
    <BlogForm {...blogFormHandle}></BlogForm>
      }

      {!visible &&<BlogList {...blogTableHandle}></BlogList>}
    </div>
  );
}
