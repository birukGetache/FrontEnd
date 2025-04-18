import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const blogs = [
  {
    id: 1,
    title: 'Gorgora Hotel',
    content: 'Gorgora in Lake Tana',
    url: '/about4.png'
  },
  {
    id: 2,
    title: 'Monk',
    content: 'Monk in Tana Lake',
    url: 'about3.png',
  },
  {
    id: 3,
    title: 'Wedding',
    content: 'Wedding in Tana Lake',
    url: '/about2.png',
  },
  {
    id: 4,
    title: 'Duck In Tana',
    content: 'Group of Duck in Tana',
    url: '/about1.png',
  },
];

const HomeRotate = () => {
  return (
    <div className="h-full m-7">
    <Marquee
      pauseOnHover
      speed={40}
      gradient={false}
      className="py-6 h-full"
    >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="mx-3 group relative w-64 h-[380px] md:h-[420px] overflow-hidden rounded-xl bg-white shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={blog.url}
              alt={blog.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
              <motion.h2
                className="text-lg md:text-xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                {blog.title}
              </motion.h2>
              <motion.p
                className="text-sm font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                {blog.content}
              </motion.p>
              <motion.button
                className="mt-3 w-fit px-4 py-2 text-xs md:text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/40 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
              >
                Read More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeRotate;