"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BottomNavBar from "./components/BottomNavBar";
import { format } from "date-fns";
import BlogView from "./components/BlogView"
import MagazineSection from "./components/MagazineSection";
import Destination from './components/PlaceDestination.js'
import InfoCard from "./components/InfoCard"
import { motion, useAnimation } from 'framer-motion';
import NewsletterSignup from "./components/NewsletterSignup"
import TransportCard from './components/TranportCard.js';
import InviteFreind from "./components/InviteFreind"
import Faq from "./components/Faq";
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with SSR turned off
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
});

import { useInView } from 'react-intersection-observer';
import TanaFotter from './components/TanaFotter.js'
import   AnimatePresence  from './components/PopupDestination';
import { useTranslation } from "react-i18next";
import Home from "./components/Main";
import Image from 'next/image';

import './i18n';

const HomePage = () => {
  const { t, i18n } = useTranslation(); 
  const users = useSelector((state) => state.counter.users);
  const [changecolor, setChange] = [false];
  const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [visibleCardId, setVisibleCardId] = useState(null);
const [destination , setDestnation] = useState([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    }
  }, [controls, inView]);
  useEffect(() => {
    const date = new Date();
    setCurrentDate(format(date, "MMMM dd, yyyy"));
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const isDark = saved === 'true';
  
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  // Animation variants for modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };
  // Determine which destinations to show
  

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
<Image
  src="/logo.png"
  alt="Logo"
  width={100} 
  height={100} 
  className="object-contain"
/>
    </div>
    );
  }

  return (
    <div className={` ${visibleCardId ? "overflow-hidden h-screen bg-black bg-opacity-25" : ""}`} id="home">
      <Home></Home>
      {/* <Calander></Calander> */}
      <div className="">
      <div>
      <BottomNavBar  darkMode={darkMode} setDarkMode={setDarkMode}/>
 
      </div>

      <div className=" font-playfair ">

      <div className="pt-3 mt-10 min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-20">
      <motion.div
      className="flex flex-col xxm:flex-col xxl:flex-row  items-center gap-6"
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={controls}
    >
      <div className="w-full xxl:w-1/2">
        <TransportCard darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className="w-full xxl:w-1/2 frame h-full">
        <div className="corner top-left"></div>
        <div className="corner bottom-right"></div>
        <img
          src="/tanalake.JPG"
          alt="left"
          className="rounded-lg w-full"
        />
      </div>
    </motion.div>

</div>
       
<Destination setVisibleCardId={setVisibleCardId} setDestnation={setDestnation}></Destination>
<MagazineSection></MagazineSection>
<InfoCard></InfoCard>
<BlogView></BlogView>
<Map></Map>
<div className=" h-68 grid mb-10">
<Faq></Faq>
<NewsletterSignup></NewsletterSignup>
</div>
{/* <InviteFreind></InviteFreind> */}
      </div>
      <TanaFotter></TanaFotter>
      </div>
     <AnimatePresence visibleCardId={visibleCardId} destination={destination}  setVisibleCardId ={setVisibleCardId}  modalVariants={modalVariants} i18n={i18n}> </AnimatePresence>
    </div>

  );
};

export default HomePage;