import React from 'react';
import Button from './button';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Growbtn = () => {
  return (
    <div className={`${dmSans.className} relative inline-block`}>
      <img 
        src="./images/Vector (1).png" 
        alt="Arrow" 
        className="absolute -top-5 -right-5" 
      />
      <Button
        bgColor="bg-[#FBFBFB]"
        textColor="text-[#0B56E0]"
        value="Grow with NetSuite"
        className="border border-[#ECECEC] px-5 mb-5 rounded-b-full rounded-l-full text-xs"
      />
    </div>
  );
};

export default Growbtn;
