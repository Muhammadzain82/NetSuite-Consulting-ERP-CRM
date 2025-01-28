"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";

export default function Chat({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState({});
  const [messages, setMessages] = useState([]);
  const chatHistoryRef = useRef(null); // Ref for chat history container

  const steps = [
    { id: 1, label: "Your Full Name", question: "What's your name?" },
    { id: 2, label: "Your Company Name", question: "What's your company name?" },
    { id: 3, label: "Type of Business", question: "What type of business do you have?" },
    { id: 4, label: "Contact Info", question: "What's your contact information?" },
    { id: 5, label: "Setup Your Account", question: "Let's set up your account." },
  ];

  const handleInputChange = (e) => {
    setResponses((prev) => ({
      ...prev,
      [currentStep]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (!responses[currentStep]) {
      alert("Please provide an answer before proceeding.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { step: currentStep, question: steps[currentStep - 1]?.question, response: responses[currentStep] || "" },
    ]);

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (onSubmit) onSubmit(responses);
      alert("Thank you! Your responses have been submitted successfully.");
      setResponses({});
      setMessages([]);
      setCurrentStep(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNext();
  };

  // Auto-scroll to the bottom of chat history
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Main Chat Section */}
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <Link href="/">
            <SlArrowLeft className="h-8 w-8 p-1 rounded-full shadow-md border cursor-pointer" />
          </Link>
        </div>

        {/* Chat History */}
        <div
          ref={chatHistoryRef}
          className="space-y-4 mb-6 h-4/6 overflow-y-auto scrollbar-invisible"
        >
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-4">
              {/* Question Bubble */}
              <div className="flex items-start justify-end space-x-4">
                <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
                  <p>{msg.question}</p>
                </div>
                <div>
                  <img src="./images/chat.png" alt="" />
                </div>
              </div>

              {/* Response Bubble */}
              <div className="flex items-start space-x-4">
                <div>
                  <img src="./images/chat.png" alt="" />
                </div>
                <div className="bg-gray-200 text-black p-4 rounded-lg max-w-md">
                  <p>{msg.response || "No response yet"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Question */}
        <div className="flex items-center space-x-4 mb-6 justify-end">
          <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
            <p>{steps[currentStep - 1]?.question}</p>
          </div>
          <div>
            <img src="./images/chat.png" alt="" />
          </div>
        </div>

        {/* Input Section */}
        <div>
          <label className="block text-gray-700 font-medium mx-5">Your Answer:</label>
          <input
            type="text"
            value={responses[currentStep] || ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="mt-2 w-full px-4 py-2 border-b-2 border-blue-500 text-gray-700 focus:outline-none focus:border-blue-700"
            placeholder="Enter your response"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 text-center flex justify-start">
          <button
            onClick={handleNext}
            className="w-36 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none"
          >
            {currentStep < steps.length ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

Chat.defaultProps = {
  onSubmit: (responses) => {
    console.log("Form submitted with:", responses);
  },
};
