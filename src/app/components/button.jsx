import React from 'react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Button = ({ value, bgColor, textColor, className, onClick }) => {
  // Define class mappings for dynamic props
  const bgClass = bgColor || 'bg-gradient-to-r from-blue-500 to-blue-700';
  const textClass = textColor || 'text-white';
  

  return (
    <button
      className={`${dmSans.className} ${bgClass} ${textClass} ${className} ${onClick} px-4 py-2 hover:opacity-90`}
    >
      {value}
    </button>
  );
};

export default Button;
