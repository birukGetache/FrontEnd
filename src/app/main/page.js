
"use client"
import Background from '../components/BackgroundPart';
import { motion } from "framer-motion";
import React, { useEffect,useState, useRef } from "react";
import { FaEdit, FaListAlt, FaCodeBranch ,FaPenAlt ,FaShareAlt , FaChartLine} from "react-icons/fa"; // Example icons from react-icons
import Footer from '../components/TanaFotter';
const Home = () => {
   
  
     const [loadingDone, setLoadingDone] = useState(false);
    
      useEffect(() => {
        const handleImagesLoaded = () => {
          setLoadingDone(true);
          const animatedWaves = document.querySelector('.ts-animated-waves');
          if (animatedWaves) {
            animatedWaves.style.transform = `translateX(calc(-100% + ${window.innerWidth + 5}px))`;
            animatedWaves.addEventListener('transitionend', () => {
              animatedWaves.classList.toggle('repeat');
            });
          }
        };
    
        const images = document.querySelectorAll('img');
        const imagesLoaded = Array.from(images).every(img => img.complete);
    
        if (imagesLoaded) {
          handleImagesLoaded();
        } else {
          window.addEventListener('load', handleImagesLoaded);
        }
    
        return () => {
          window.removeEventListener('load', handleImagesLoaded);
        };
      }, []);




   const handle = ()=>{
  if(!localStorage.getItem("token")){
    window.location.href = "/login";
  }
  else{
    window.location.href = "/Dashboard";
  }
   }
    return (
        <div className={`ts-page-wrapper ${loadingDone ? 'loading-done' : ''}`}>
        {/* Header with backdrop blur */}
        <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/30 border-b-2 border-gray-300 py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-white">Questionnaire Builder</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="text-white hover:text-gray-200 transition-colors">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-200 transition-colors">Features</a></li>
                <li><a href="#" className="text-white hover:text-gray-200 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white hover:text-gray-200 transition-colors">Contact</a></li>
                <li>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={handle}
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

    
    <section className="h-screen  text-black grid grid-cols-2 p-10 items-center justify-center">
    <div className="container mx-auto px-6 text-center">
      {/* Animated heading */}
      <motion.h1
        className="text-5xl font-bold mb-6 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: false }} // Ensures the animation only plays once
      >
        <motion.span
          className="block"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: false }} // Ensures the animation only plays once
        >
          Create Custom <span className="text-blue-600">Questionnaires</span> with Ease
        </motion.span>
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        viewport={{ once: false }} // Ensures the animation only plays once
      >
        Design, share, and analyze questionnaires effortlessly. Perfect for surveys, quizzes, and forms.
      </motion.p>

      {/* Animated button */}
      <motion.a
        href="#"
        className="inline-block text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        viewport={{ once: false }} // Ensures the animation only plays once
      >
        Start Building Now
      </motion.a>
    </div>
    
    </section>

   
    <section className="py-20">
      <div className="mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 w-fit md:grid-cols-3 gap-20 m-auto">
          {/* Feature 1 */}
          <motion.div
            className="backdrop-blur-md bg-white/30 border w-60 border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <FaEdit className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Customizable Questions</h3>
            <p className="text-gray-600">Add text, multiple-choice, dropdowns, and more to create the perfect questionnaire.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white border border-gray-200 w-60 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <FaListAlt className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Multi-Section Support</h3>
            <p className="text-gray-600">Organize your questions into sections for better structure and readability.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white border border-gray-200 w-60 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <FaCodeBranch className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Logic Branching</h3>
            <p className="text-gray-600">Show or hide questions based on previous answers for a personalized experience.</p>
          </motion.div>
        </div>
      </div>
    </section>

    
    <section className="py-20 bg-gray-100">
      <div className="mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 w-fit md:grid-cols-3 gap-20 m-auto">
          {/* Step 1: Create */}
          <motion.div
            className="bg-white w-60 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <FaPenAlt className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Create</h3>
            <p className="text-gray-600">Design your questionnaire with our intuitive builder.</p>
          </motion.div>

          {/* Step 2: Share */}
          <motion.div
            className="bg-white w-60 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <FaShareAlt className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Share</h3>
            <p className="text-gray-600">Share your questionnaire via link or embed it on your website.</p>
          </motion.div>

          {/* Step 3: Analyze */}
          <motion.div
            className="bg-white w-60 border border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <FaChartLine className="text-4xl text-blue-600" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Analyze</h3>
            <p className="text-gray-600">Analyze responses with real-time charts and reports.</p>
          </motion.div>
        </div>
      </div>
    </section>
 
    <section className="py-20">
      <div className=" mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 w-fit md:grid-cols-2 gap-20 m-auto">
          {/* Testimonial 1 */}
          <motion.div
            className="bg-white border w-60 border-gray-200 rounded-lg shadow-sm p-6 hover-scale relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            {/* User Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 relative">
              <img
                src="/vercel.svg" // Replace with your default user image path
                alt="User"
                className="w-full h-full object-cover"
              />
              {/* Quotation Mark */}
              <div className="absolute -top-2 -right-2 bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">"</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-center">
              "This tool has made creating surveys so easy and efficient. Highly recommended!"
            </p>
            <p className="text-gray-800 font-semibold text-center">- John Doe</p>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            className="bg-white border w-60 border-gray-200 rounded-lg shadow-sm p-6 hover-scale relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            {/* User Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 relative">
              <img
                src="/vercel.svg" // Replace with your default user image path
                alt="User"
                className="w-full h-full object-cover"
              />
              {/* Quotation Mark */}
              <div className="absolute -top-2 -right-2 bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">"</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-center">
              "The logic branching feature is a game-changer. It makes our surveys much more dynamic."
            </p>
            <p className="text-gray-800 font-semibold text-center">- Jane Smith</p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-100">
      <div className="mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 w-fit md:grid-cols-3 gap-20 m-auto">
          {/* Free Plan */}
          <motion.div
            className="bg-white border w-60 border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Free</h3>
            <p className="text-gray-600 mb-4">Perfect for individuals and small projects.</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">$0</p>
            <ul className="text-gray-600 mb-6 text-left">
              <li className="mb-2">✓ Limited question generation</li>
              <li className="mb-2">✓ Limited analysis generation</li>
              <li className="mb-2">✓ 2 GB space</li>
            </ul>
            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </a>
          </motion.div>

          {/* Pro Plan (Recommended) */}
          <motion.div
            className="bg-white border w-60 border-blue-600 rounded-lg shadow-lg p-6 text-center hover-scale relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            {/* Recommended Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Recommended
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pro</h3>
            <p className="text-gray-600 mb-4">For growing teams and businesses.</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">$29/mo</p>
            <ul className="text-gray-600 mb-6 text-left">
              <li className="mb-2">✓ Unlimited question generation</li>
              <li className="mb-2">✓ Advanced analysis generation</li>
              <li className="mb-2">✓ 10 GB space</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </a>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="bg-white border w-60 border-gray-200 rounded-lg shadow-sm p-6 text-center hover-scale"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Enterprise</h3>
            <p className="text-gray-600 mb-4">For large organizations with custom needs.</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">Custom</p>
            <ul className="text-gray-600 mb-6 text-left">
              <li className="mb-2">✓ Unlimited question generation</li>
              <li className="mb-2">✓ Advanced analysis generation</li>
              <li className="mb-2">✓ 50 GB space</li>
              <li className="mb-2">✓ Dedicated support</li>
              <li className="mb-2">✓ Custom integrations</li>
            </ul>
            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    
   
  
   <Footer></Footer>
 
<Background></Background>
</div>
    )
}

export default Home;