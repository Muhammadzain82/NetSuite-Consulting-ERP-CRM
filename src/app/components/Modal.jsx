"use client";
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-[80vw] h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
