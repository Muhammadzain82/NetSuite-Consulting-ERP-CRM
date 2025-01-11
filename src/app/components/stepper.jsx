"use client";
import React, { useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import Button from "./button";
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const StartAndStepper = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 for start page

  const stepQuestions = [
    {
      label: "First Name",
      placeholder: "Enter your first name",
      value: "",
    },
    {
      label: "Last Name",
      placeholder: "Enter your last name",
      value: "",
    },
    {
      label: "Email",
      placeholder: "Enter your email",
      value: "",
    },
    {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      value: "",
    },
  ];

  // const handleNext = () => {
  //   if (currentStep < stepQuestions.length) setCurrentStep(currentStep + 1);
  // };


  // const handleStart = () => {
  //   setCurrentStep(1);
  // };

  return (
    <div className={`${dmSans.className} flex items-center justify-center max-w-7xl bg-gray-50 mx-auto mt-10`}>
      {currentStep === 0 ? (
        
        <div className="max-w-md w-full px-8 py-20 text-center">
          <h1 className="text-5xl  text-gray-800 leading-relaxed">
            Bring <span className="font-bold"> Your <br/> Ideas</span> <span className="text-blue-600 font-bold"> to Life</span>
          </h1>
          <p className="mt-6 text-gray-600">
            Collaborate with us to explore how NetSuite can transform your
            business processes and drive success.
          </p>
          {/* <Button
          value={"Book Consultation"}
          className={"rounded-lg mt-10"}
          onClick={handleStart}
          /> */}

<button
            // onClick={handleStart}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md shadow-md hover:bg-blue-700"
          >
            Book Consultation
          </button>

        </div>
      ) : (
        
        <div className="w-full max-w-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-grow h-[3px] ${
                      step < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Inputs */}
          <form className="space-y-6">
            {stepQuestions.map(
              (question, index) =>
                index + 1 === currentStep && (
                  <div key={index}>
                    <label
                      htmlFor={question.label}
                      className="block text-lg font-medium text-gray-700"
                    >
                      {question.label}
                    </label>
                    <input
                      type="text"
                      id={question.label}
                      placeholder={question.placeholder}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )
            )}
          </form>

         
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              {currentStep === 4 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartAndStepper;
