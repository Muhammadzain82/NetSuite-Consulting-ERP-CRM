"use client"
import React, { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { DM_Sans } from 'next/font/google';
import { motion } from 'framer-motion'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });


      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={`${dmSans.className} flex flex-wrap justify-between items-center px-4 lg:px-8 py-6 gap-6 lg:gap-0`}>
      {/* Logo Section */}
      <div className="flex-shrink-0 cursor-pointer" onClick={scrollToTop}>
        <img
          src="/images/logo.png"
          alt="Your company logo"
          className="w-24 lg:w-32"
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        <ul className="flex gap-4 lg:gap-10 text-sm lg:text-base font-medium text-[#181818]">
          {[
            { id: "home", label: "Home" },
            { id: "services", label: "Services" },
            { id: "features", label: "Features" },
            { id: "testimonials", label: "Testimonials" },
            { id: "Blogs", label: "Blogs" },
          ].map((item) => (
            <li
              key={item.id}
              className="transform transition-all duration-300 hover:scale-90 hover:text-[#0B56E0]"
            >
              <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.hr
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "290px", opacity: 1 }}
          transition={{ duration: 1 }}
          className="my-8 border-2 border-[#3BAEEB] w-[290px]"
        />


        <div className="flex gap-4 text-lg lg:text-xl text-[#181818]">
          {[
            { icon: FaInstagram, name: "Instagram" },
            { icon: FaLinkedinIn, name: "LinkedIn" },
            { icon: FaFacebookF, name: "Facebook" },
            { icon: FaTwitter, name: "Twitter" },
          ].map((social, index) => (
            <social.icon
              key={index}
              className="hover:text-[#0B56E0] cursor-pointer"
              aria-label={social.name}
            />
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
