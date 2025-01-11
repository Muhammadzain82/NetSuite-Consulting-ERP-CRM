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
        src="./images/Vector.png" 
        alt="Arrow" 
        className="absolute -top-5 -left-5" 
      />
      <Button
        value="Join Us"
        className="rounded-b-full rounded-r-full px-8 text-xs"
      />
    </div>
  );
};

export default Joinbtn;
