import React from 'react';
import { DM_Sans } from 'next/font/google';
import Button from './button';
import Heroimage from "./heroimage";
import Growbtn from './growbtn';
import Joinbtn from './joinbtn';


const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Herosection = () => {
  return (
    <div className={`${dmSans.className} mt-10 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-5xl text-center mx-auto">
        <div className="absolute lg:mt-40 md:mt-36 sm:mt-56 right-[8%]"><Joinbtn /></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mx-auto mt-12 font-normal">
          Transform{' '}
          <span className="bg-black text-transparent bg-clip-text font-bold">
            Your Business
          </span>{' '}
          with Expert{' '}
          <span className="bg-gradient-to-r from-[#0B56E0] to-[#367CFF] text-transparent bg-clip-text font-bold">
            NetSuite Consulting
          </span>

        </h1>
        <div className="grid justify-items-center">
          <div className="text-[#6A7080] text-lg sm:text-xl md:text-2xl font-medium my-6 sm:my-10">
            <div className="absolute lg:mt-12 md:mt-12 sm:mt-20 left-[10%]">
              <Growbtn />
            </div>
            Streamline operations and drive growth with tailored NetSuite solutions.
          </div>

          <div className="flex flex-wrap justify-center mx-auto gap-4 sm:gap-6">
            <Button
              value="Get a Free Quote"
              className="rounded-lg"
            />
            <Button
              bgColor="bg-white"
              textColor="text-[#0B56E0]"
              value="Book Consultation"
              className="border border-[#0B56E0] rounded-lg"
            />
          </div>
        </div>
      </div>
      <Heroimage />
    </div>

  );
};

export default Herosection;
