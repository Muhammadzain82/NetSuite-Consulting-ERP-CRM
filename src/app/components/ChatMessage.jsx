import React from "react";

const ChatMessage = ({ isUser = false, message = "", label = "" }) => {
  // Safely handle undefined/null values with default empty strings
  const safeMessage = message || "";
  const safeLabel = label ? label.replace("...", "") : "";

  // Determine the content based on whether it's a user message
  const content = isUser 
    ? `${safeLabel} ${safeMessage}`.trim() 
    : safeMessage;

  return (
    <div
      className={`text-lg flex items-center ${
        isUser ? "justify-end" : ""
      } font-normal gap-4`}
    >
      {!isUser && (
        <img src="/client.png" loading="lazy" alt="AI Assistant" className="w-10 h-10 rounded-full" />
      )}
      <p
        className={`whitespace-pre-wrap shadow-md ${
          isUser ? "text-white bg-[#3BAEEB]" : "bg-white"
        } shadow-[#7b8a9c3a] px-6 py-4 rounded-xl h-fit max-w-[80%]`}
      >
        {content}
      </p>
      {isUser && (
        <img src="/client.png" loading="lazy" alt="User" className="w-10 h-10 rounded-full" />
      )}
    </div>
  );
};

export default ChatMessage;