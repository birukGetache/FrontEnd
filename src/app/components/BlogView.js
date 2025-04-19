"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaHeart, FaThumbtack, FaComment } from "react-icons/fa";
import BottomNavBar from "../components/BottomNavBar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const App = ({id}) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
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
          const initialVisibleComments = {};
          response.data.forEach((post) => {
            initialVisibleComments[post._id] = 2;
          });
          setVisibleComments(initialVisibleComments);
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Animation variants for in-view animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // ... rest of your handlers remain the same ...

  if (blogPosts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white" id="Blog">
        <div className="relative w-16 h-16 flex justify-center items-center">
          <div className="absolute w-full h-full border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
          <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 sm:mx-20 rounded-md" id="Blog">
      <motion.p 
        className="text-gray-600 text-center font-extrabold text-3xl sm:text-4xl mb-10 tracking-tight"
        initial="hidden"
        whileInView="visible"
        variants={titleVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        {t("blogsTitle")}
      </motion.p>

      <motion.div 
        className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post._id}
            className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-96 p-0
              backdrop-blur-md 
    border border-blue-500/40 
    bg-gradient-to-br from-white/25 to-white/10 
    text-blue-600 font-semibold text-sm 
    shadow-md shadow-black/10"
            variants={cardVariants}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <motion.img
                className="w-full h-64 rounded-md object-cover transition-transform duration-500 hover:scale-105"
                src={post.imageUrl}
                alt={post.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              {post.isPinned && (
                <motion.div 
                  className="absolute top-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t("pinned")}
                </motion.div>
              )}
            </div>
            <div className="p-4">
              <motion.h2 
                className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {post.title}
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {post.description}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaThumbsUp className="mr-1" size={14} /> {post.likes} {t("likes")}
                </motion.button>
                {/* <motion.button
                  onClick={() => handleFavorite(post._id)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    post.isFavorite
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart className="mr-1" size={14} />{" "}
                  {post.isFavorite ? t("favorited") : t("favorite")}
                </motion.button>
                <motion.button
                  onClick={() => handlePin(post._id)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    post.isPinned
                      ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaThumbtack className="mr-1" size={14} />{" "}
                  {post.isPinned ? t("pinned") : t("pin")}
                </motion.button> */}
              </motion.div>

              <motion.div 
                className="border-t border-gray-200 pt-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  <motion.input
                    type="text"
                    value={commentInputs[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    placeholder={t("addComment")}
                    className="w-full p-2 border border-gray-200 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaComment size={16} />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {post.comments.slice(0, visibleComments[post._id] || 2).map((comment, index) => (
                    <motion.div
                      key={index}
                      className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                      variants={commentVariants}
                      viewport={{ once: true }}
                    >
                      {comment}
                    </motion.div>
                  ))}
                </div>

                {post.comments.length > (visibleComments[post._id] || 2) && (
                  <motion.button
                    onClick={() => handleShowMoreComments(post._id)}
                    className="mt-3 text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("showMore")}
                  </motion.button>
                )}
                {(visibleComments[post._id] || 2) > 2 && (
                  <motion.button
                    onClick={() => handleShowLessComments(post._id)}
                    className="mt-1 text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("showLess")}
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default App;