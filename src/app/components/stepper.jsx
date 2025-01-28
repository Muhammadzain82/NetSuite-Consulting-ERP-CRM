"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import { LiaCheckCircle } from "react-icons/lia";
import AOS from 'aos';
import 'aos/dist/aos.css';

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const stepQuestions = [
    [
      { placeholder: "Enter your first name", name: "firstName" },
      { placeholder: "Enter your last name", name: "lastName" },
      { placeholder: "Enter your email", name: "email" },
      { placeholder: "Enter your phone number", name: "phone" },
    ],
    [
      { placeholder: "Enter your company name", name: "companyName" },
      { placeholder: "Enter service of interest", name: "serviceInterest" },
      { placeholder: "Enter preferred date", name: "preferredDate" },
      { placeholder: "Enter preferred time", name: "preferredTime" },
    ],
    [
      { placeholder: "Enter additional notes", name: "notes", isTextArea: true },
    ],
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 4) {
      const timer = setTimeout(() => setCurrentStep(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleStart = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentStep(1);
      setTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    if (currentStep < stepQuestions.length) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setTransitioning(false);
      }, 500);
    } else if (currentStep === stepQuestions.length) {
      setCurrentStep(4);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className={`${dmSans.className} mt-20 flex items-center justify-center rounded-lg h-[80vh] w-[90%] mx-auto bg-gray-50`}
    >
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></motion.div>
        </div>
      ) : currentStep === 0 ? (
        <div className="max-w-lg w-full px-8 py-20 text-center"
        data-aos="fade-up"
            data-aos-duration="3000">
          <h1 className="text-6xl text-gray-800 leading-15">
            Bring <span className="font-bold">Your <br /> Ideas</span>
            <span className="text-blue-600 font-bold"> to Life</span>
          </h1>
          <p className="mt-6 text-gray-600">
            Collaborate with us to explore how NetSuite can transform your
            business processes and drive success.
          </p>
          <button
            onClick={handleStart}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md shadow-md hover:bg-blue-700"
          >
            Book Consultation
          </button>
        </div>
      ) : currentStep === 4 ? (
        <div className="text-center px-8 py-20">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
          >
            <LiaCheckCircle
              size={100}
              className="text-blue-600 text-6xl mx-auto mb-4"
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          key={currentStep}
          initial={{ x: transitioning ? "100%" : 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[90%] p-8"
        >
          <div className="flex justify-center items-center mb-20">
            <div className="flex justify-center items-center w-full justify-center w-[50%]">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center w-full max-w-xl">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                      } transition-transform duration-500`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-grow justify-center h-[3px] mx-5 ${step < currentStep ? "bg-blue-600" : "bg-gray-300"
                        } transition-all duration-500`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-12" data-aos="fade-left">
            {stepQuestions[currentStep - 1]?.map((question, index) => (
              <div key={index}>
                {question.isTextArea ? (
                  <textarea
                    id={question.name}
                    name={question.name}
                    placeholder={question.placeholder}
                    onChange={handleInputChange}
                    className="w-full px-5 py-2 mb-10 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                  />
                ) : (
                  <input
                    type="text"
                    id={question.name}
                    name={question.name}
                    placeholder={question.placeholder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
                  />
                )}
              </div>
            ))}
          </form>

          <div className="flex justify-center mb-0 mt-10 bottom-0">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Stepper;
