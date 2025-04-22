import React from "react";
import { FaBlog, FaThumbsUp, FaComment } from "react-icons/fa";

const TopBlogs = ({ blogs }) => {
  // Find most liked/commented blogs
  const getTopBlogs = () => {
    return [...blogs]
      .sort((a, b) => {
        // Sort by likes + comments
        const aScore = (a.likes || 0) + (a.comments?.length || 0);
        const bScore = (b.likes || 0) + (b.comments?.length || 0);
        return bScore - aScore;
      })
      .slice(0, 3); // Get top 3
  };

  const topBlogs = getTopBlogs();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaBlog className="mr-2 text-amber-600" />
        Popular Blogs
      </h2>
      <div className="space-y-4">
        {topBlogs.length > 0 ? (
          topBlogs.map((blog, index) => (
            <div key={index}>
              <h3 className="font-medium line-clamp-1 text-slate-500">{blog.title}</h3>
              <div className="flex justify-between mt-1 text-sm">
                <div className="flex items-center text-green-600">
                  <FaThumbsUp className="mr-1" />
                  <span>{blog.likes || 0} likes</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <FaComment className="mr-1" />
                  <span>{blog.comments?.length || 0} comments</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No blog data available</p>
        )}
      </div>
    </div>
  );
};

export default TopBlogs;