"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import axios from "axios";
import debounce from "lodash.debounce";
import { FixedSizeList as List } from "react-window";
import Image from "next/image";
import ChatMessage from "./Chat/ChatMessage";
import TypingIndicator from "./Chat/TypingIndicator";

const SidebarStep = React.memo(({ index, style, steps, currentStep }) => (
  <div style={style}>
    <div
      className={`flex text-sm lg:text-base xl:text-lg items-start space-x-4 ${index <= currentStep ? "text-white" : "text-[#FFFFFF33]"
        }`}
    >
      <div className="flex flex-col justify-center">
        <div>
          <div
            className={`p-1 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? "border-white" : "border-[#FFFFFF33]"
              }`}
          >
            <div
              className={`p-[6px] rounded-full ${index <= currentStep ? "bg-white" : "bg-[#FFFFFF33]"
                }`}
            ></div>
          </div>
          <div
            className={`py-3 xl:py-4 border-r-2 mr-[11px] border-dashed m-1 ${index <= currentStep ? "border-white" : "border-[#FFFFFF33]"
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
  const [responses, setResponses] = useState({
    fullName: "",
    companyName: "",
    business: "",
    email: "",
    phoneNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState();
  const [isTyping, setIsTyping] = useState(false);
  // const [IsEmailValid, setIsEmailValid] = useState()

  // Fetch Steps Data
  useEffect(() => {
    const fetchQuestions = async () => {

      // Show typing indicator
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
      {/* Sidebar */}
      <div
        className={`${shrink ? "opacity-100 md:w-[25%] md:absolute left-0" : "w-full opacity-0"
          } h-full transition-all duration-[1500ms] flex flex-col justify-between bg-gradient-to-r from-[#3BAEEB] to-[#0F5D86] p-4 md:p-5 lg:p-8 text-white rounded-3xl`}
      >
        <div className="space-y-10">
          <button onClick={onClose}>
            <Image src="/Logo.png" alt="Logo" width={140} height={100} />
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
                steps={steps}
                currentStep={currentStep}
              />
            )}
          </List>
        </div>
        <div className="">
          <p className="text-sm xl:text-base">
            More Than <span className="font-bold">14,000</span> Experts Use{" "}
            <span className="font-bold">Xpert Assistant</span>
          </p>
          <p className="text-xs">
            Xpert Assistant sets the standard in CV analysis.
          </p>
        </div>
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