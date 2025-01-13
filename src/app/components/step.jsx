"use client";
import React, { useState } from "react";
import { DM_Sans } from "next/font/google";
import { AiOutlineCheckCircle } from "react-icons/ai";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const StartAndStepper = () => {
    const [currentStep, setCurrentStep] = useState(0); // Initially at step 0
    const [formData, setFormData] = useState({});

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
            { label: "Additional Notes", placeholder: "Enter additional notes", name: "notes", isTextArea: true },
        ],
    ];

    const handleStart = () => {
        setCurrentStep(0); // Start at step 0
    };

    const handleNext = () => {
        if (currentStep === 3) {
            // If on Step 3, go directly to Step 4
            setCurrentStep(4);
        } else if (currentStep < stepQuestions.length) {
            // For other steps, transition to the next step
            setCurrentStep(prev => prev + 1); // Smooth transition
        } else if (currentStep === 4) {
            // Reset after Thank You page
            setCurrentStep(0);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className={`${dmSans.className} mt-20 flex items-center justify-center rounded-lg h-[80vh] w-[80%] mx-auto bg-gray-50`} // Changed to 80%
        >
            {currentStep === 0 ? (
                <div className="w-full px-8 py-20 text-center">
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
                    <AiOutlineCheckCircle className="text-blue-600 text-6xl mx-auto mb-4 animate-bounce" />
                    
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full p-8">
                    <div className="flex justify-center items-center mb-20">
                        <div className="flex items-center w-full justify-center">
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
                                            className={`flex-grow h-[3px]  ${step < currentStep ? "bg-blue-600" : "bg-gray-300"
                                                } transition-all duration-500`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <form className="space-y-12">
                        {stepQuestions[Math.floor(currentStep) - 1]?.map((question, index) => (
                            <div key={index}>
                                <label htmlFor={question.name} className="block text-lg font-medium text-gray-700">
                                    {question.label}
                                </label>
                                {question.isTextArea ? (
                                    <textarea
                                        id={question.name}
                                        name={question.name}
                                        placeholder={question.placeholder}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
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

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartAndStepper;
