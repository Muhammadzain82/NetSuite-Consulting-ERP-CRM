"use client";
import React, { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import Button from "./button";
import Heroimage from "./heroimage";
import Growbtn from "./growbtn";
import Joinbtn from "./joinbtn";
import Modal from "./Modal";
import Chat from "./chat";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Herosection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      once: false,
    });
  }, []);

  return (
    <div className={`${dmSans.className} mt-5 px-4 sm:px-6 lg:px-8`} id="home">
      <div className="max-w-5xl text-center mx-auto">
        <motion.div
          className="absolute lg:mt-40 md:mt-36 mt-44 right-[8%]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <Joinbtn />
        </motion.div>

        <h1
          className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl mx-auto mt-12 font-normal"
          data-aos="fade-up"
        >
          Transform{" "}
          <span className="bg-black text-transparent bg-clip-text font-bold">
            Your Business
          </span>{" "}
          with Expert{" "}
          <span className="bg-gradient-to-r from-[#0B56E0] to-[#367CFF] text-transparent bg-clip-text font-bold">
            NetSuite Consulting
          </span>
        </h1>

        <div className="grid justify-items-center">
          <div className="text-[#6A7080] text-lg sm:text-xl md:text-2xl font-medium lg:my-6 md:my-6 my-16">
            <motion.div
              className="absolute lg:mt-12 md:mt-12 mt-24 left-[10%]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
            >
              <Growbtn />
            </motion.div>
            <p data-aos="fade-up">
              Streamline operations and drive growth with tailored NetSuite
              solutions.
            </p>
          </div>

          {/* Buttons with zoom-in animation */}
          <motion.div
            className="flex flex-wrap justify-center mx-auto gap-4 sm:gap-6 mt-5 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <Button
              // onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              value={"Get a Free Quote"}
            />

            <Button
              bgColor="bg-white"
              textColor="text-[#0B56E0]"
              value="Book Consultation"
              className="border border-[#0B56E0] rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Modal Component
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Chat />
      </Modal> */}

      {/* Hero Image */}
      <Heroimage />
    </div>
  );
};

export default Herosection;
