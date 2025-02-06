import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chat({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const chatHistoryRef = useRef(null);
  const [data, setData] = useState(null);
  const [responses, setResponses] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    interest: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: ""
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://api.360xpertsolutions.com/api/xpert-consultation-netsuites?sort=id:asc");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error loading questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  const steps = data?.data;

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10,}$/;
    return phonePattern.test(phone);
  };

  const convertTo24HourFormat = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}`);
    if (isNaN(date)) {
      return "";  
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleInputChange = (e) => {
    const stepType = steps?.[currentStep - 1]?.attributes?.type;
    const { name, value } = e.target;

   
    if (stepType === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email address");
    }

    if (stepType === "numbers") {
      setPhoneError(validatePhone(value) ? "" : "Enter a valid 10-digit phone number");
    }

    if (stepType === "time") {
      const formattedTime = convertTo24HourFormat(value);
      setResponses((prev) => ({
        ...prev,
        [name]: formattedTime, 
      }));
      return;
    }

    setResponses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    const currentStepKey = steps?.[currentStep - 1]?.attributes?.key;

    if (!responses[currentStepKey]) {
      alert("Please provide an answer before proceeding.");
      return;
    }

    if (steps?.[currentStep - 1]?.attributes?.type === "email" && emailError) {
      alert("Please enter a valid email address.");
      return;
    }

    if (steps?.[currentStep - 1]?.attributes?.type === "numbers" && phoneError) {
      alert("Please enter a valid 10-digit phone number.");
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
      setCurrentStep((prev) => prev + 1);
    } else {
      const formattedResponse = {
        data: {
          FullName: responses.fullName,
          Email: responses.email,
          PhoneNumber: responses.phoneNumber,
          CompanyName: responses.companyName || "",
          Interest: responses.interest || "",
          PreferredDate: responses.preferredDate,
          PreferredTime: responses.preferredTime ? convertTo24HourFormat(responses.preferredTime) : "",
          AdditionalNotes: responses.additionalNotes,
        },
      };

      console.log("Formatted Responses to Submit:", formattedResponse);

      try {
        const res = await axios.post(
          "https://api.360xpertsolutions.com/api/xpert-consultation-netsuite-responses",
          formattedResponse,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Responses submitted successfully:", res);
        alert("Responses submitted successfully!");
        window.location = "/"
      } catch (error) {
        console.error("Error submitting responses:", error);
        alert("Error submitting your responses. Please try again later.");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNext();
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full h-[77vh] bg-white p-1 flex flex-col justify-between">
        {/* Chat History */}
        <div ref={chatHistoryRef} className="space-y-4 mb-6 h-4/6 overflow-y-auto scrollbar-invisible">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-4">
              {/* Question Bubble */}
              <div className="flex items-start justify-start space-x-4">
                <div>
                  <img src="./images/chat.png" alt="" />
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
                  <p>{msg.question}</p>
                </div>
              </div>

              {/* Response Bubble */}
              <div className="flex items-start justify-end space-x-4">
                <div className="bg-gray-200 text-black p-4 rounded-lg max-w-md">
                  <p>{msg.response || "No response yet"}</p>
                </div>
                <div>
                  <img src="./images/chat.png" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Question */}
        <div className="flex items-center space-x-4 mb-6 justify-start">
          <div>
            <img src="./images/chat.png" alt="" />
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg max-w-md">
            {steps?.length > 0 ? (
              <p>{steps?.[currentStep - 1]?.attributes?.question}</p>
            ) : (
              <p>...</p>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div>
          <label className="block text-gray-700 font-medium mx-5">Your Answer:</label>
          <input
            type={steps?.[currentStep - 1]?.attributes?.type}
            name={steps?.[currentStep - 1]?.attributes?.key} 
            value={responses[steps?.[currentStep - 1]?.attributes?.key] || ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="mt-2 w-full px-4 py-2 border-b-2 border-blue-500 text-gray-700 focus:outline-none focus:border-blue-700"
            placeholder={`Enter your ${steps?.[currentStep - 1]?.attributes?.label}`}
          />

          {emailError && currentStep === 3 && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
          {phoneError && currentStep === 4 && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 text-center flex justify-start">
          <button
            onClick={handleNext}
            className="w-36 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none"
          >
            {currentStep < steps?.length ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}



