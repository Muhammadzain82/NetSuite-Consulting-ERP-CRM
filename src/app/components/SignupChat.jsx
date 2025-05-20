"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FixedSizeList as List } from "react-window";
import Image from "next/image";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const SidebarStep = React.memo(({ index, style, steps, currentStep }) => (
  <div style={style}>
    <div
      className={`flex text-sm lg:text-base xl:text-lg items-start space-x-4 ${
        index <= currentStep ? "text-white" : "text-[#FFFFFF33]"
      }`}
    >
      <div className="flex flex-col justify-center">
        <div>
          <div
            className={`p-1 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep ? "border-white" : "border-[#FFFFFF33]"
            }`}
          >
            <div
              className={`p-[6px] rounded-full ${
                index <= currentStep ? "bg-white" : "bg-[#FFFFFF33]"
              }`}
            ></div>
          </div>
          <div
            className={`py-3 xl:py-4 border-r-2 mr-[11px] border-dashed m-1 ${
              index <= currentStep ? "border-white" : "border-[#FFFFFF33]"
            } ${index === steps.length - 1 ? "border-none" : ""}`}
          ></div>
        </div>
      </div>
      <span>{steps[index]?.item}</span>
    </div>
  </div>
));

export default function SignupChat({ shrink, onClose, setShrink }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [responses, setResponses] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

   const scrollToBottom = () =>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
   };

   useEffect(() => {
    scrollToBottom();
   }, [currentStep, isTyping, validationErrors]);

  // Fetch Steps Data
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsTyping(true);
      try {
        const response = await axios.get(
          "https://api.360xpertsolutions.com/api/xpert-consultation-netsuites?sort=id:asc"
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

        // Initialize empty responses object
        const initialResponses = {};
        fetchedSteps.forEach((step) => {
          initialResponses[step.key] = "";
        });
        setResponses(initialResponses);

        setIsTyping(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsTyping(false);
      }
    };
    fetchQuestions();
  }, []);

  // Reset current input when step changes
  useEffect(() => {
    setCurrentInput(responses[steps[currentStep]?.key] || "");
    setValidationErrors("");
  }, [currentStep, steps, responses]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCurrentInput(value);
  };

  const formatQuestion = useCallback(
    (question) => {
      if (!question) return "";
      return question.replace("[Name]", responses.fullName || "");
    },
    [responses.fullName]
  );

  const validateCurrentStep = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) {
      return true;
    }

    // Email validation
    if (currentStepData.key === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(currentInput)) {
        setValidationErrors("Please enter a valid email address.");
        return false;
      }
    }

    // Phone number validation
    if (currentStepData.key === "phoneNumber") {
      const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      if (!phonePattern.test(currentInput)) {
        setValidationErrors("Please enter a valid phone number.");
        return false;
      }
    }

    // Ensure input is not empty
    if (!currentInput.trim()) {
      setValidationErrors("This field cannot be empty.");
      return false;
    }

    setValidationErrors("");
    return true;
  };

  const submitResponse = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const currentKey = steps[currentStep]?.key;
    if (!currentKey) return;

    try {
      // Update responses
      const updatedResponses = {
        ...responses,
        [currentKey]: currentInput,
      };
      setResponses(updatedResponses);

      // Add to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          type: "question",
          content: formatQuestion(steps[currentStep]?.question),
        },
        {
          type: "answer",
          content: currentInput,
          label: steps[currentStep]?.label,
        },
      ]);

      // Clear current input
      setCurrentInput("");

      if (currentStep < steps.length - 1) {
        // Move to next question
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setCurrentStep((prev) => prev + 1);
        setIsTyping(false);
      } else {
        // Submit all responses to Strapi
        setIsSubmitting(true);
        
        const res = await axios.post(
          "https://api.360xpertsolutions.com/api/xpert-consultation-netsuite-responses",
          {
            data: updatedResponses,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response from server:", res.data);
        alert("Responses submitted successfully!");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error in submitResponse:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.error?.message || error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitResponse();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !isSubmitting && currentInput.trim()) {
      e.preventDefault();
      submitResponse();
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push("/SignUp");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full relative items-end h-full">
      {/* Sidebar */}
      <div
        className={`${
          shrink ? "opacity-100 md:w-[25%] md:absolute left-0" : "w-full opacity-0"
        } h-full transition-all duration-[1500ms] flex flex-col justify-between bg-gradient-to-r from-[#0B56E0] to-[#367CFF] p-4 md:p-5 lg:p-8 text-white rounded-3xl`}
      >
        <div className="space-y-10">
          <button onClick={onClose}>
            <Image src="/images/Logo.png" alt="Logo" width={140} height={100} />
          </button>
          <List
            height={330}
            itemCount={steps.length}
            itemSize={60}
            width="100%"
            itemData={{ steps, currentStep }}
          >
            {({ index, style }) => (
              <SidebarStep
                index={index}
                style={style}
                steps={steps}
                currentStep={currentStep}
              />
            )}
          </List>
        </div>
        <div className=""></div>
      </div>

      <div className="flex z-30 absolute top-0 md:left-[27%] right-4 md:right-0">
        {currentStep >= 0 && (
          <button
            onClick={() => setShrink(!shrink)}
            className="text-[#3BAEEB] mt-8 bg-white rounded-full shadow-md md:p-3 p-2 mb-8 flex items-center gap-2 w-10 h-10 md:w-fit md:h-fit"
          >
            <IoIosArrowBack size={32} />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="relative h-full w-[70%] overflow-hidden lg:left-[31%]">
        <form onSubmit={handleSubmit} className="w-full overflow-x-hidden max-h-[100%] overflow-y-scroll scrollbar-hide absolute bottom-0 pl-10">
          <div className="w-full rounded-lg space-y-2">
            {/* Show chat history */}
            {chatHistory.map((item, index) => (
              <div key={index} className="mt-4">
                {item.type === "question" ? (
                  <ChatMessage message={item.content} />
                ) : (
                  <ChatMessage 
                    isUser 
                    message={item.content} 
                    label={item.label} 
                  />
                )}
              </div>
            ))}

            <div ref={messagesEndRef}/>

            {/* Current question */}
            {isTyping ? (
              <TypingIndicator />
            ) : (
              currentStep < steps.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage
                    message={formatQuestion(steps[currentStep]?.question)}
                  />
                </motion.div>
              )
            )}

            {validationErrors && (
              <ChatMessage message={validationErrors} isError />
            )}

            {/* Input field for current question */}
            {currentStep < steps.length && (
              <div className="w-full sticky bottom-0 bg-white left-0">
                <div className="flex w-full flex-col gap-6">
                  <label className="text-[#9D9D9D]">
                    {steps[currentStep]?.label}
                  </label>
                  <input
                    type={steps[currentStep]?.key === "email" ? "email" : 
                    steps[currentStep]?.key === "phoneNumber" ? "tel" : "text"}
                    placeholder={steps[currentStep]?.item}
                    name={steps[currentStep]?.key}
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    pattern={steps[currentStep]?.pattern || ".*"}
                    title={steps[currentStep]?.title || "Please provide a valid input"}
                    className="w-[90%] font-md border-b-2 border-[#3BAEEB] text-[#3BAEEB] placeholder:font-normal focus:outline-none px-2 py-1 bg-transparent"
                    required
                    disabled={isTyping || isSubmitting}
                  />
                </div>
                <div className="flex mt-10 gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`py-2 px-10 border-2 bg-transparent border-[#F0F0F0] text-black rounded-lg hover:bg-[#e7f1fd27] ${
                      currentStep === 0 ? "hidden" : ""
                    }`}
                  >
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    className="py-2 px-10 border-2 bg-transparent border-[#F0F0F0] text-black rounded-lg hover:bg-[#e7f1fd27]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || !currentInput.trim()}
                  >
                    {currentStep < steps.length - 1 ? "Next" : isSubmitting ? "Submitting..." : "Finish"}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Thank you message after submission */}
            {/* {currentStep >= steps.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <ChatMessage message="Thank you for your responses! We'll get back to you soon." />
              </motion.div>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
}