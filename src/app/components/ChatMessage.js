import React from "react";

 const ChatMessage = ({ isUser, message, label }) => {
  return (
    <div className={`text-lg flex items-center ${isUser ? 'justify-end' : ''} font-normal gap-4`}>
      {!isUser && <img src="/client.png" loading="lazy" alt="Client" />}
      <p className={`whitespace-pre-wrap shadow-md ${
        isUser 
          ? 'text-white bg-[#3BAEEB]' 
          : 'bg-white'
      } shadow-[#7b8a9c3a] px-6 py-4 rounded-xl h-fit`}>
        {isUser ? `${label?.replace("...", "") || ""} ${message}` : message}
      </p>
      {isUser && <img src="/client.png" loading="lazy" alt="Client" />}
    </div>
  );
};

export default ChatMessage;