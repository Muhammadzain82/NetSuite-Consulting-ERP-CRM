"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "./button";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const AnimatedNumber = ({ target, duration, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    setCount(0);

    const step = target / (duration / 20);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          const nextValue = prev + step;
          return nextValue >= target ? target : nextValue;
        }
        clearInterval(interval);
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [target, duration, animate]);

  return (
    <h1 className="bg-gradient-to-r from-blue-500 to-blue-700 text-5xl md:text-8xl text-transparent bg-clip-text font-bold">
      {Math.floor(count)}+
    </h1>
  );
};

const Experts = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalDuration = 2000;

  return (
    <div ref={sectionRef} className={`${dmSans.className} mx-5 px-5 my-20`}>
      {/* Button */}
      <Button
        bgColor="bg-transparent"
        textColor="text-[#0B56E0]"
        value="Trusted Excellence"
        className="border border-[#ECECEC] px-8 py-2 mb-5 rounded-full font-bold"
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl my-5 text-center">
        Expertise That{" "}
        <span className="bg-black text-transparent bg-clip-text font-bold">
          Matters
        </span>
      </h1>

      {/* Description */}
      <p className="text-[#6A7080] text-center max-w-2xl mx-auto">
        Delivering tailored NetSuite solutions to drive efficiency, innovation, and business success.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {/* Stat 1 */}
        <div className="text-center">
          <AnimatedNumber target={40} duration={totalDuration} animate={animate} />
          <p className="text-[#6A7080] mt-5">Certified Experts</p>
        </div>

        {/* Stat 2 */}
        <div className="text-center">
          <AnimatedNumber target={500} duration={totalDuration} animate={animate} />
          <p className="text-[#6A7080] mt-5">Successful Projects</p>
        </div>

        {/* Stat 3 */}
        <div className="text-center">
          <AnimatedNumber target={10} duration={totalDuration} animate={animate} />
          <p className="text-[#6A7080] mt-5">Years of Experience</p>
        </div>

        {/* Stat 4 */}
        <div className="text-center">
          <AnimatedNumber target={300} duration={totalDuration} animate={animate} />
          <p className="text-[#6A7080] mt-5">Custom Implementations</p>
        </div>
      </div>
    </div>
  );
};

export default Experts;
