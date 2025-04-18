"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaHeart, FaThumbtack, FaComment } from "react-icons/fa";
import BottomNavBar from "../components/BottomNavBar";
import { useTranslation } from "react-i18next";

const App = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({}); // Track comments for each post
  const [visibleComments, setVisibleComments] = useState({}); // Track visible comments for each post
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("https://tankwaaddis.onrender.com/api/blogs")
      .then((response) => {
        if (response.data.length > 0) {
          setBlogPosts(
            response.data.map((post) => ({
              ...post,
              comments: post.comments || [],
            }))
          );
          // Initialize visible comments for each post
          const initialVisibleComments = {};
          response.data.forEach((post) => {
            initialVisibleComments[post._id] = 2;
          });
          setVisibleComments(initialVisibleComments);
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (postId) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      axios
        .post(`https://tankwaaddis.onrender.com/api/blogs/${postId}/comments`, { comment })
        .then((response) => {
          setBlogPosts((prev) =>
            prev.map((post) =>
              post._id === postId ? { ...post, comments: response.data.comments } : post
            )
          );
          setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  const handleLike = (postId) => {
    axios
      .post(`https://tankwaaddis.onrender.com/api/blogs/${postId}/like`)
      .then((response) => {
        setBlogPosts((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, likes: response.data.likes } : post
          )
        );
      })
      .catch((error) => console.error("Error liking the blog:", error));
  };

  const handleFavorite = (postId) => {
    axios
      .post(`https://tankwaaddis.onrender.com/api/blogs/${postId}/favorite`)
      .then((response) => {
        setBlogPosts((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, isFavorite: response.data.isFavorite } : post
          )
        );
      })
      .catch((error) => console.error("Error updating favorite state:", error));
  };

  const handlePin = (postId) => {
    axios
      .post(`https://tankwaaddis.onrender.com/api/blogs/${postId}/pin`)
      .then((response) => {
        setBlogPosts((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, isPinned: response.data.isPinned } : post
          )
        );
      })
      .catch((error) => console.error("Error updating pin state:", error));
  };

  const handleShowMoreComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: prev[postId] + 2,
    }));
  };

  const handleShowLessComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: 2,
    }));
  };

  if (blogPosts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="relative w-16 h-16 flex justify-center items-center">
          <div className="absolute w-full h-full border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
          <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <p className="text-gray-900 text-center font-extrabold text-3xl sm:text-4xl mb-10 tracking-tight">
        {t("blogsTitle")}
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                src={post.imageUrl}
                alt={post.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              {post.isPinned && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {t("pinned")}
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                  aria-label={t("likeBlog")}
                >
                  <FaThumbsUp className="mr-1" size={14} /> {post.likes} {t("likes")}
                </button>
                <button
                  onClick={() => handleFavorite(post._id)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
                    post.isFavorite
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label={post.isFavorite ? t("removeFavorite") : t("addFavorite")}
                >
                  <FaHeart className="mr-1" size={14} />{" "}
                  {post.isFavorite ? t("favorited") : t("favorite")}
                </button>
                <button
                  onClick={() => handlePin(post._id)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
                    post.isPinned
                      ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label={post.isPinned ? t("unpinBlog") : t("pinBlog")}
                >
                  <FaThumbtack className="mr-1" size={14} />{" "}
                  {post.isPinned ? t("pinned") : t("pin")}
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-1 mb-4">
                  <input
                    type="text"
                    value={commentInputs[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    placeholder={t("addComment")}
                    className="w-full p-2 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    aria-label={t("commentInput")}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                    aria-label={t("submitComment")}
                  >
                    <FaComment size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  {post.comments.slice(0, visibleComments[post._id] || 2).map((comment, index) => (
                    <div
                      key={index}
                      className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                    >
                      {comment}
                    </div>
                  ))}
                </div>

                {post.comments.length > (visibleComments[post._id] || 2) && (
                  <button
                    onClick={() => handleShowMoreComments(post._id)}
                    className="mt-3 text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    {t("showMore")}
                  </button>
                )}
                {(visibleComments[post._id] || 2) > 2 && (
                  <button
                    onClick={() => handleShowLessComments(post._id)}
                    className="mt-1 text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    {t("showLess")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;