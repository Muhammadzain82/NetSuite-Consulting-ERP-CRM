"use client";

import React from "react";
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Button = ({ value, bgColor, textColor, className, onClick }) => {
  const bgClass = bgColor || "bg-gradient-to-r from-blue-500 to-blue-700";
  const textClass = textColor || "text-white";

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.01, ease: "easeInOut" }}
      onClick={onClick}
      className={`${dmSans.className} ${bgClass} ${textClass} ${className} px-4 py-2 hover:opacity-90 rounded-lg shadow-md`}
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      {value}
    </motion.button>
  );
};

export default Button;
