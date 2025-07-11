"use client";
import React, { useState } from "react";
import Button from "./button";
import { DM_Sans } from "next/font/google";
import Modal from "./Modal";
import Chat from "./chat";
import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

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

      if (isClick) {
        setIsClick(false);
      }
    }
  };

  return (
    <>
      <nav className={`${dmSans.className} mx-5`}>
        <div className="max-w-full sm:px-6 lg:px-8 py-5 text-textcolor">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/">
                <Image
                  src="/images-webp/logo.webp"
                  alt="Netsuite-logo"
                  width={128}
                  height={40}
                  className="w-32 cursor-pointer"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-between w-full">
              <ul className="flex gap-10 mx-auto text-lg bg-[#F7F8FC] text-[#181818] p-4 rounded-lg font-dm-sans">
                <li>
                  <a 
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")} 
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    onClick={(e) => scrollToSection(e, "services")}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#features" 
                    onClick={(e) => scrollToSection(e, "features")}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonials"
                    onClick={(e) => scrollToSection(e, "testimonials")} 
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    Testimonials
                  </a>
                </li>
                <li className="hover:text-blue-600 transition-colors duration-300">
                  <a href="#Blogs" onClick={(e) => scrollToSection(e, "Blogs")}>
                    Blogs
                  </a>
                </li>
              </ul>

              <Button
                value={"Book Consultation"}
                className={"rounded-lg"}
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* Toggle Button for Medium and Small Screens */}
            <div className="lg:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Medium and Small Screens Menu */}
          <div
            className={`lg:hidden ${
              isClick ? "block" : "hidden"
            } flex flex-col items-center space-y-4 py-4`}
          >
            <ul className="py-2 space-y-5 text-center">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => scrollToSection(e, "home")}
                  className="hover:text-blue-600 transition-colors duration-300"
                >  
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => scrollToSection(e, "services")}
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => scrollToSection(e, "features")}
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  onClick={(e) => scrollToSection(e, "testimonials")}
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a 
                  href="#Blogs" 
                  onClick={(e) => scrollToSection(e, "Blogs")}
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  Blogs
                </a>
              </li>
            </ul>

            <Button
              bgcolor={"bg-gradient-to-r from-[#0B56E0] to-[#367CFF]"}
              textcolor={"text-white"}
              value={"Book Consultation"}
              round={"lg"}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Chat />
      </Modal>
    </>
  );
};

export default Navbar;