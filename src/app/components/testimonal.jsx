"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DM_Sans } from "next/font/google";
import AOS from 'aos';
import 'aos/dist/aos.css';


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const testimonials = [
  {
    id: 1,
    icon: "./images/icon.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do not nyoun terd tempor incididunt,  eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    name: "Mike Warren",
    role: "Product Developer at Webflow",
    date: "14/Dec/2024",
  },
  {
    id: 2,
    icon: "./images/icon.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    name: "Micheal Jackson",
    role: "Founder, CEO",
    date: "16/Dec/2024",
  },
  {
    id: 3,
    icon: "./images/icon.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    name: "Sara Khan",
    role: "Project Manager",
    date: "20/Dec/2024",
  },
];

const Testimonal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // animation duration
      once: true, // animation only happens once (on scroll into view)
    });
  }, []);
  return (
    <>
      <div className={`${dmSans.className} my-10`}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 my-5 pt-12 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:items-end gap-10 mb-0">
              {/* Left side - Testimonial Card */}
              <div className="order-2 lg:order-1 flex items-end">
                <div
                  className={`bg-white rounded-t-lg p-10 w-full transition-transform duration-1000`}
                  key={testimonials[currentIndex].id}
                >
                  <div data-aos="fade-left">
                    <img
                      src={testimonials[currentIndex].icon}
                      alt={testimonials[currentIndex].name}
                    />
                    <p className="text-[#514F6E] text-sm mb-4 leading-relaxed">
                      {testimonials[currentIndex].text}
                    </p>
                    <div className="flex justify-between items-center mt-6"
                    >
                      <div>
                        <h4 className="text-[#151313] font-semibold"
                        >
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-[#A1A0A6] text-sm"
                        >
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                      <p className="text-[#A1A0A6] text-sm" 
                      >
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Text */}
              <div className="order-1 lg:order-2 text-white pb-12 pl-10 lg:pb-0">
                <button className="bg-[#ECECEC] text-[#0B56E0] rounded-full px-10 py-2 text-sm mb-6">
                  Testimonials
                </button>
                <h1 className="text-4xl lg:text-5xl font-semibold">
                  What Our Clients{" "}
                  <span className="bg-white text-transparent bg-clip-text font-bold">
                    Say About Us
                  </span>
                </h1>
                <p className="text-white mt-6 mb-10 leading-relaxed max-w-md">
                  Hear from our satisfied clients about how we&apos;ve helped
                  them achieve their goals with tailored solutions.
                </p>
                <h1 className="text-5xl font-bold mb-2">500+</h1>
                <p className="text-lg mb-5">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-[-5%] lg:bottom-[-10%] left-1/2 transform -translate-x-1/2 -translate-y-1/4">
            <div className="flex bg-white px-5 rounded-lg shadow">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
              >
                <IoIosArrowBack size={30} className="text-blue-500" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-2"
              >
                <IoIosArrowForward size={30} className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonal;
