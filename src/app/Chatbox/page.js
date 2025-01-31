"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import axios from "axios";
import debounce from "lodash.debounce";
import { FixedSizeList as List } from "react-window";
import Image from "next/image";




export default function SignupChat({ shrink, onClose, setShrink }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [responses, setResponses] = useState({
    fullName: "",
    companyName: "",
    business: "",
    email: "",
    phoneNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState();
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    const fetchQuestions = async () => {

      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const response = await axios.get(
          "https://api.360xpertsolutions.com/api/xpert-assisst-bot-ques?sort=id:asc"
        );
        const fetchedSteps = response.data.data.map((q) => ({
          item: q?.attributes.item,
          question: q?.attributes?.question,
          label: q?.attributes.label,
          key: q?.attributes.key,
          pattern: q?.attributes.pattern,
          title: q?.attributes.title,
        }));
        setSteps(fetchedSteps);
        setIsTyping(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    debouncedSaveResponse(name, value);
  };

  const debouncedSaveResponse = debounce((name, value) => {
    console.log(`Saving response: ${name} = ${value}`);
  }, 300);

  const formatQuestion = (question) => {
    if (!question) return "";
    return question.replace("{fullName}", responses.fullName || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for email step
    if (steps[currentStep]?.key === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(responses.email)) {
        setValidationErrors("Please enter a valid email address.");
        return;
      }
    }
    console.log(validationErrors);

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);

    } else {
      try {
        const res = await axios.post(
          "https://api.360xpertsolutions.com/api/xpert-assisstent-bot-responses",
          { data: responses }
        );
        alert("Responses submitted successfully!");
        console.log("Data submitted successfully:", res.data);
      } catch (error) {
        console.error("Error submitting responses:", error);
      }
    }

    if (currentStep !== steps.length - 1) {

      setIsTyping(true);
      // Simulate bot thinking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false)
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push("./SignUp");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full relative items-end h-full">
      

      {/* Content Area */}
      <div className="relative h-full w-[70%] overflow-hidden lg:left-[31%]">
        <img src="./blurDiv.png" className="z-50 w-full" alt="Blur" />
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full absolute bottom-0">
          <div className="pl-10 w-full rounded-lg space-y-6">
            {steps.slice(0, currentStep).map((step, index) => (
              <div key={index} className="mt-4">
                <ChatMessage
                  message={formatQuestion(step?.question)}
                />
                <ChatMessage
                  isUser
                  message={responses[step.key] || ""}
                  label={step.label}
                />
              </div>
            ))}

            {/* Current question */}
            {isTyping ? (
              <TypingIndicator/>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage
                  message={formatQuestion(steps[currentStep]?.question)}
                />
              </motion.div>
            )}

            {steps[currentStep]?.key === "email" && validationErrors && (
              <ChatMessage
                message={validationErrors}
              />
            )}

            <div className="w-full ml-16 left-0">
              <div className="flex w-full flex-col gap-6">
                <label className="text-[#9D9D9D]">
                  {steps[currentStep]?.label}
                </label>
                <input
                  type="text"
                  placeholder={steps[currentStep]?.item}
                  name={steps[currentStep]?.key}
                  pattern={steps[currentStep]?.pattern || ".*"}
                  title={steps[currentStep]?.title || "Please provide a valid input"}
                  value={responses[steps[currentStep]?.key] || ""}
                  onChange={handleInputChange}
                  className="w-[90%] font-md border-b-2 border-[#3BAEEB] text-[#3BAEEB] placeholder:font-normal focus:outline-none"
                  required
                />

              </div>
              <div className="flex mt-10 gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`py-2 px-10 border-2 bg-transparent border-[#F0F0F0] text-black rounded-lg hover:bg-[#e7f1fd27] ${currentStep === 0 ? "hidden" : ""
                    }`}
                >
                  Back
                </button>
                <motion.button
                  type="submit"
                  className="py-2 px-10 border-2 bg-transparent border-[#F0F0F0] text-black rounded-lg hover:bg-[#e7f1fd27]"
                >
                  {currentStep < steps.length - 1 ? "Next" : "Finish"}
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}