"use client";
import React, { useEffect } from "react";
import Button from "./button";
import { DM_Sans } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const Feature = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            once: false,
        });
    }, []);

    return (
        <div className={`${dmSans.className} bg-gradient-to-r from-blue-500 to-blue-700 my-10 py-12`} id="features">
            <div className="max-w-full max-md:max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-8 md:gap-y-12 lg:grid-cols-2">

                    {/* Left Side - Image */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <img
                            src="./images/Group 58.png"
                            alt=""
                            className="h-auto w-auto lg:p-10"
                            data-aos="fade-zoom-in"
                            data-aos-easing="ease-in-back"
                            data-aos-delay="300"
                            data-aos-offset="0"
                        />
                    </motion.div>

                    {/* Right Side - Text */}
                    <motion.div
                        className="text-white px-5 lg:px-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: false }}
                    >
                        <motion.button
                            className="bg-[#FBFBFB47] text-white border border-white rounded-full py-2 px-8"
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false }}
                        >
                            Features
                        </motion.button>

                        <motion.h1
                            className="text-5xl text-white mt-10"
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="200"
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false }}
                        >
                            Key Features of{" "}
                            <span className="bg-white text-5xl text-transparent bg-clip-text font-bold">
                                NetSuite ERP
                            </span>
                        </motion.h1>

                        <motion.p
                            className="max-w-2xl text-white my-10"
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: false }}
                        >
                            NetSuite ERP offers a comprehensive suite of tools, including financial management, inventory tracking, order management, CRM integration, and advanced reporting. Designed to streamline operations, enhance decision-making, and support global scalability, it’s the ultimate solution for driving business growth and efficiency.
                        </motion.p>

                        {/* List of Features */}
                        <ul className="flex flex-wrap gap-16 my-5 list-disc pl-5">
                            {[
                                {
                                    title: "Financial Management",
                                    description:
                                        "Simplify finances with tools for ledger, payables/receivables, planning, and revenue tracking.",
                                },
                                {
                                    title: "E-Commerce Integration",
                                    description:
                                        "E-Commerce Integration in NetSuite ERP streamlines online transactions and store management.",
                                },
                                {
                                    title: "Reporting and Analytics",
                                    description:
                                        "NetSuite ERP offers real-time dashboards, advanced reports, and KPI monitoring for insights.",
                                },
                                {
                                    title: "Project Management",
                                    description:
                                        "NetSuite ERP simplifies resource allocation, budget tracking, and time/expense management.",
                                },
                            ].map((feature, index) => (
                                <motion.li
                                    key={index}
                                    className="w-full sm:w-[40%]"
                                    data-aos="fade-right"
                                    data-aos-offset="300"
                                    data-aos-easing="ease-in-sine"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                    viewport={{ once: false }}
                                >
                                    <div>
                                        <h4 className="text-xl font-semibold">{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false }}
                        >
                            <Button
                                bgColor="bg-white"
                                textColor="text-[#0B56E0]"
                                value="Book Consultation"
                                className="border border-[#0B56E0] rounded-lg mt-8 font-bold"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
