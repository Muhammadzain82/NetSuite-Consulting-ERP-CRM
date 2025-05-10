import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { ClientPageRoot } from "next/dist/client/components/client-page";

export default function Chat({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState([]);
  const chatHistoryRef = useRef(null);
  const [data, setData] = useState(null);
  const [showTyping, setShowTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responses, setResponses] = useState({
    fullName: "",
    companyName: "",
    business: "",
    email: "",
    phoneNumber: "",
  });

  console.log(responses , 'ddddddddddddddd')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://api.360xpertsolutions.com/api/xpert-consultation-netsuites"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error loading questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  const HandleSubmit = async () => {
    try {
      // console.log("Submitting:", responses);

      const payload = {
        data: {
          email: responses.email,
          phoneNumber: responses.phoneNumber,
          fullName: responses.fullName,
          companyName: response.companyName,
        },
      };

      // console.log(response, 'payloadddd')

      const response = await axios.post(
        "https://api.360xpertsolutions.com/api/xpert-consultation-netsuite-responses",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData(response.data?.data?.attributes);
      console.log("Success:", response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error submitting data. Please check your input.");
    }
  };

  const steps = data?.data;

  const handleNext = async () => {
    const currentStepKey = steps?.[currentStep - 1]?.attributes?.key;

    if (!responses[currentStepKey]) {
      alert("Please provide an answer before proceeding.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        step: currentStep,
        question: steps[currentStep - 1]?.attributes?.question,
        response: responses[currentStepKey] || "",
      },
    ]);

    if (currentStep < steps.length) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setCurrentStep((prev) => prev + 1);
      }, 2000);
    } else {
      HandleSubmit();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location = "/";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full h-[77vh] bg-white p-1 flex flex-col justify-between">
        <div ref={chatHistoryRef} className="space-y-4 mb-6 h-4/6 overflow-y-auto scrollbar-invisible">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="flex items-start justify-start space-x-4">
                <img src="./images/chat.png" alt="" />
                <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
                  <p>{msg.question}</p>
                </div>
              </div>

              <div className="flex items-start justify-end space-x-4">
                <div className="bg-gray-200 text-black p-4 rounded-lg max-w-md">
                  <p>{msg.response || "No response yet"}</p>
                </div>
                <img src="./images/chat.png" alt="" />
              </div>
            </div>
          ))}

          {showTyping && (
            <div className="flex items-start justify-start space-x-4">
              <img src="./images/chat.png" alt="" />
              <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {!showTyping && (
          <div className="flex items-center space-x-4 mb-6 justify-start">
            <img src="./images/chat.png" alt="" />
            <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
              {steps?.length > 0 ? (
                <p>{steps?.[currentStep - 1]?.attributes?.question}</p>
              ) : (
                <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mx-5">Your Answer:</label>
          <input
            type={steps?.[currentStep - 1]?.attributes?.type}
            name={steps?.[currentStep - 1]?.attributes?.key}
            value={responses[steps?.[currentStep - 1]?.attributes?.key] || ""}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission
                handleNext();
              }
            }}
            className="mt-2 w-full px-4 py-2 border-b-2 border-blue-500 text-gray-700 focus:outline-none focus:border-blue-700"
            placeholder={`Enter your ${steps?.[currentStep - 1]?.attributes?.label}`}
          />

        </div>

        <div className="mt-6 text-center flex justify-start">
          <button
            onClick={handleNext}
            className="w-36 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none"
            disabled={showTyping}
          >
            {currentStep < steps?.length ? "Next" : "Submit"}
          </button>
        </div>

        <SuccessModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}