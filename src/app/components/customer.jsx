"use client";
import React, { useEffect } from "react";
import { DM_Sans } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Customer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200, 
      once: false, 
    });
  }, []);

  return (
    <div className={`${dmSans.className} mt-10 px-4 lg:px-8`}>
      <motion.div
        className="flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-16 max-w-8xl mx-auto items-center px-6 lg:px-12 py-8 border border-[#ECECEC] rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-5xl leading-tight"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            Customer{" "}
            <span className="text-5xl bg-black text-transparent bg-clip-text font-bold">
              Success
            </span>{" "}
            with{" "}
            <span className="text-5xl bg-gradient-to-r from-[#0B56E0] to-[#367CFF] text-transparent bg-clip-text font-bold">
              <br /> NetSuite Solutions
            </span>
          </motion.h1>
          <motion.p
            className="text-[#6A7080] text-sm sm:text-md font-medium my-4 sm:my-5"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Streamline operations and drive growth with tailored NetSuite
            solutions.
          </motion.p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <img
              src="./images/heart.png"
              alt="Heart Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            />
            <p
              className="text-2xl sm:text-4xl font-bold text-[#0B56E0]"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              26,563
            </p>
          </motion.div>
          <motion.img
            src="./images/people.png"
            alt="People"
            className="w-28 h-12 sm:w-36 sm:h-16 object-contain"
            data-aos="fade-up"
            data-aos-duration="3000"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Customer;
