"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import SignupChat from "./SignupChat"; // Assuming this component is defined elsewhere

export default function Modal({ isOpen, onClose, children }) {
  let [shrink, setShrink] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 0,
      text: "This team has been instrumental in helping us achieve our goals. Their clear communication, problem-solving skills, and dedication to delivering quality results made all the difference. I would highly recommend their services to anyone.",
      name: "Bushra Nadeem",
      role: "Organization: Hr Solutions",
      avatar: "/avatar-face-3.jpg"
    },
    {
      id: 1,
      text: "The NetSuite implementation was flawless and exceeded our expectations. Their team's expertise and attention to detail saved us countless hours and significantly improved our operational efficiency.",
      name: "Michael Johnson",
      role: "CFO: TechCorp Inc.",
      avatar: "/avatar-face-3.jpg"
    },
    {
      id: 2,
      text: "Working with this consulting firm transformed our business processes. Their customized NetSuite solution streamlined our workflows and provided insights we didn't even know were possible.",
      name: "Sarah Williams",
      role: "Operations Director: Global Retail",
      avatar: "/avatar-face-3.jpg"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (shrink) {
      const timer = setTimeout(() => setShowDiv(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowDiv(true);
    }
  }, [shrink]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center p-4 sm:p-6" onClick={handleBackgroundClick}>
      <motion.div
        initial={{ y: 800, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.01,
          ease: "easeInOut"
        }}
        className={`w-full max-w-[1200px] h-full max-h-[800px] md:max-h-[700px] transition-all duration-[1500ms] p-4 sm:p-6 bg-white rounded-xl md:rounded-2xl`}>

        {showDiv && <div
          className={`${shrink ? "w-[25%] whitespace-nowrap opacity-0" : "w-full opacity-100"} p-4 sm:p-6 lg:p-8 xl:p-10 overflow-hidden shadow-lg space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10 relative transition-all duration-[2000ms] bg-gradient-to-r from-[#0B56E0] to-[#367CFF] rounded-xl md:rounded-2xl h-full`}
        >
          <div className={`flex items-center justify-between`}>
            <button onClick={onClose} className="w-32 sm:w-40 md:w-48">
              <Image 
                src="/images/Logo2.png" 
                alt="Logo" 
                width={180} 
                height={100}
                className="w-full h-auto"
              />
            </button>
            <button onClick={onClose}>  
              <FaTimes
                className="text-[#3BAEEB] bg-white rounded-full p-1 sm:p-2 text-3xl sm:text-4xl cursor-pointer hover:scale-110 transition-transform shadow-lg"
                title="Close"
              />
            </button>
          </div>
          <div className={`text-white mt-2 sm:mt-3 md:mt-4 space-y-4 sm:space-y-6 md:space-y-8`}>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transform Your Business{" "}
              <span className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                with
              </span>{" "}
              Expert{" "}
              <motion.div
                className="mt-1 sm:mt-2 md:mt-3 inline-block bg-white rounded-sm py-1 sm:py-2 md:py-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-[#367CFF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 sm:px-4">
                 NetSuite Consulting
                </h2>
              </motion.div>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-4/5 md:w-3/4 font-light"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Streamline operations and drive growth with tailored NetSuite solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => {
                  setShrink(true)
                }}
                className="bg-[#367CFF] text-white px-4 py-2 sm:px-5 sm:py-3 md:px-6 rounded-md hover:bg-gradient-to-b hover:duration-1000 shadow-md hover:from-[#367CFF] hover:to-[#0B56E0] transition-all font-bold text-sm sm:text-base md:text-lg hover:cursor-pointer relative z-20"
              >
                Book Your Demo
              </button>
            </motion.div>

            <div className="w-full flex justify-end overflow-hidden absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10">
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    className="bg-[#0B56E0] rounded-lg sm:rounded-xl shadow-lg w-full p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 md:space-y-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-white tracking-wider text-xs sm:text-sm md:text-base">
                      {testimonials[currentTestimonial].text}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        width={48}
                        height={48}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-xs sm:text-sm text-white">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-1 sm:gap-2 justify-center w-full">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`p-1 rounded-full ${currentTestimonial === index ? 'bg-white' : 'bg-[#FFFFFF2E]'}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4 + (index * 0.2) }}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>}
        {!showDiv && <SignupChat shrink={shrink} onClose={onClose} setShrink={setShrink} />}
      </motion.div>
    </div>
  );
}