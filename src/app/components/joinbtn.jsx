import React from 'react';
import Button from './button';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Joinbtn = () => {
  return (
    <div className={`${dmSans.className} relative inline-block`}>
      <img
        src="/images/Vector.png"
        alt="Arrow"
        className="absolute -top-5 -left-5"
      />
      <div
        className="rounded-b-full rounded-r-full px-8 py-2 text-xs bg-gradient-to-r from-blue-500 to-blue-700 text-white">
         Join Us
        </div>
    </div>
  );
};

export default Joinbtn;