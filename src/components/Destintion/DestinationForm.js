import LanguageSelector from "@components/Destintion/LanguageSelector"
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
              type="button"
              onClick={() => setVisible(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {editMode ? 'Update Destination' : 'Add Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DestinationForm;