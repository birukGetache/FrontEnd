const BlogForm = ({handleSubmit,setDescription,title, setTitle,description,handleImageChange, setVisible })=>{
    return(<>
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
  </>)}
  export default BlogForm;