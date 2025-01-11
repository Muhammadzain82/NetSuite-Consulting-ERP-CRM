import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Footer = () => {
  return (
    <div className={`${dmSans.className} flex flex-wrap justify-between items-center sm:mx-auto px-4 lg:px-8 py-6 gap-6 lg:gap-0`}>
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <img
          src="/images/logo.png"
          alt="Your company logo"
          // className="w-24 lg:w-32"
        />
      </div>

      {/* Navigation Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-10 lg:my-10 lg:flex-wrap">
        <ul className="flex gap-4 lg:gap-10 text-sm lg:text-base font-medium text-[#181818]">
          <li className="transform transition-all duration-300 hover:scale-90 hover:text-[#0B56E0]">
            <Link href="/">Home</Link>
          </li>
          <li className="transform transition-all duration-300 hover:scale-90 hover:text-[#0B56E0]">
            <Link href="/about">Services</Link>
          </li>
          <li className="transform transition-all duration-300 hover:scale-90 hover:text-[#0B56E0]">
            <Link href="/services">Features</Link>
          </li>
          <li className="transform transition-all duration-300 hover:scale-90 hover:text-[#0B56E0]">
            <Link href="/contact">Testimonials</Link>
          </li>
        </ul>

        {/* Gradient Divider */}
        <div className="lg:block bg-gradient-to-r from-[#0B56E0] to-[#367CFF] h-1 w-72"></div>
      

      {/* Social Icons Section */}
      <div className="flex gap-4 text-lg lg:text-xl text-[#181818]">
        <FaInstagram className="hover:text-[#0B56E0] cursor-pointer" />
        <FaLinkedinIn className="hover:text-[#0B56E0] cursor-pointer" />
        <FaFacebookF className="hover:text-[#0B56E0] cursor-pointer" />
        <FaTwitter className="hover:text-[#0B56E0] cursor-pointer" />
      </div>
      </div>
    </div>
  );
};

export default Footer;
