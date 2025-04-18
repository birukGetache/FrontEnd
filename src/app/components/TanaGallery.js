import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const blogs = [
  {
    id: 1,
    title: 'gorgora Hotel',
    content: 'gorgora in Lake',
    url: '/about4.png'
  },
  {
    id: 2,
    title: 'Monk',
    content: 'Monk in Tana lake',
    url: 'about3.png',
  },
  {
    id: 3,
    title: 'wedding',
    content: 'Wedding in tana lake.',
    url: '/about2.png',
  },
  {
    id: 4,
    title: 'Duck In tana',
    content: 'group of Duck in tana.',
    url: '/about1.png',
  },
];

const TanaGallery = () => {
  return (
    <div className="relative w-[87vw] mx-auto my-12 overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-white/80 to-gray-100/50 shadow-2xl backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <Marquee
        pauseOnHover={true}
        speed={40}
        gradient={false}
        className="py-6"
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="mx-4 group relative w-80 h-[450px] overflow-hidden rounded-xl bg-white shadow-xl"
            initial={{ opacity: 0, y: 50, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: { duration: 0.3 },
            }}
          >
            {/* Image with subtle zoom effect on hover */}
            <motion.img
              src={blog.url}
              alt={blog.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Overlay with gradient and content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <motion.h2
                className="text-xl font-bold tracking-tight mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                {blog.title}
              </motion.h2>
              <motion.p
                className="text-sm font-light line-clamp-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                {blog.content}
              </motion.p>
              {/* Call-to-action button */}
              <motion.button
                className="mt-3 w-fit px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/40 transition-colors"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
              >
                Read More
              </motion.button>
            </div>
            {/* Subtle hover border effect */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl pointer-events-none"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default TanaGallery;