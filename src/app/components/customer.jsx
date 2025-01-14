import React from 'react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Customer = () => {
  return (
    <div className={`${dmSans.className} mt-10 px-4 lg:px-8`}>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-16 max-w-8xl mx-auto items-center px-6 lg:px-12 py-8 border border-[#ECECEC] rounded-lg">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl leading-tight">
            Customer {' '}
            <span className="text-5xl bg-black text-transparent bg-clip-text font-bold">
              Success
            </span>{' '}
            with{' '}
            <span className="text-5xl bg-gradient-to-r from-[#0B56E0] to-[#367CFF] text-transparent bg-clip-text font-bold">
              <br /> NetSuite Solutions
            </span>
          </h1>
          <p className="text-[#6A7080] text-sm sm:text-md font-medium my-4 sm:my-5">
            Streamline operations and drive growth with tailored NetSuite solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end">
          <div className="flex items-center gap-4">
            <img
              src="./images/heart.png"
              alt="Heart Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <p className="text-2xl sm:text-4xl font-bold text-[#0B56E0]">
              26,563
            </p>
          </div>
          <img
            src="./images/people.png"
            alt="People"
            className="w-28 h-12 sm:w-36 sm:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
