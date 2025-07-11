"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Heroimage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      once: false,
    });
  }, []);

  return (
    <div className="relative mt-5 z-10">
      {/* Line Image */}
      <motion.img
        src="./images-webp/line.webp"
        alt="Line-Graph"
        className="absolute left-0 -rotate-12 h-6 lg:h-auto md:h-10"
        data-aos="fade-down"
        data-aos-duration="2000"
        style={{ top: 0 }}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      />

      {/* Frame Image */}
      <motion.img
        src="./images-webp/Frame.webp"
        alt="Frame-image-webp"
        className="absolute right-0 rotate-17 h-10 lg:h-auto md:h-10"
        data-aos="fade-down"
        data-aos-duration="2000"
        style={{ top: 0 }}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: false }}
      />

      {/* Hero Image */}
      <motion.img
        src="./images-webp/hero.webp"
        alt="Netsuitexpert-Dashboard-Hero"
        className="relative mx-auto"
        data-aos="flip-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: false }}
      />
    </div>
  );
};

export default Heroimage;
