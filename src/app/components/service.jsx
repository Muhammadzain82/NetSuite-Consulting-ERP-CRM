"use client";
import React, { useEffect } from 'react';
import Button from './button';
import { DM_Sans } from 'next/font/google';
import AOS from 'aos';
import 'aos/dist/aos.css';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const Service = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false,
            easing: 'ease-out',
        });
    }, []);

    return (
        <div className={`${dmSans.className} my-10`} id="services">
            <div className="mx-5 py-16 px-4">
                <button className='bg-[#FBFBFB] text-[#0B56E0] border border-[#ECECEC] px-8 mb-5 rounded-full py-2 px-5'>Services</button>
                <h3 className="text-black text-5xl mb-5" data-aos="fade-up" data-aos-anchor-placement="top-center">
                    Empowering Your Business with <span className='font-semibold'>NetSuite Solutions</span>
                </h3>
                <p className="flex flex-col sm:flex-row justify-between mt-4 text-sm sm:text-base text-gray-600 leading-relaxed"
                    data-aos="fade-up" data-aos-anchor-placement="top-center">
                    <span>
                        Streamline operations, enhance efficiency, and achieve growth with our tailored NetSuite services.
                    </span>
                    <Button
                        value={"Get a Free Quote"}
                        className={"rounded-lg mt-4 sm:mt-0"}
                    />
                </p>
            </div>

            <div className="mx-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* First Column */}
                    <div className="group bg-[#FBFBFB] rounded-xl px-5 pt-5 hover:bg-gradient-to-r from-blue-500 to-blue-700 text-black flex flex-col"
                        data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                        <h3 className="text-left mt-4 sm:text-xl md:text-xl lg:text-2xl font-semibold mb-5 group-hover:text-white">
                            Comprehensive ERP/CRM Services
                        </h3>
                        <p className="text-sm sm:text-base text-left leading-relaxed group-hover:text-white text-[#6A7080]">
                            Streamline your business processes with scalable ERP/CRM solutions that adapt to your evolving needs.
                        </p>
                        <img
                            src="./images/service (6).png"
                            alt="ERP/CRM Services"
                            className="w-full mt-auto mb-0"
                        />
                    </div>

                    {/* Second Column */}
                    <div className="group bg-[#FBFBFB] rounded-xl hover:bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                        <h3 className="text-black group-hover:text-white text-center sm:text-xl md:text-xl lg:text-2xl font-semibold mt-5">
                            NetSuite WebStore Design
                        </h3>
                        <img src="./images/service (3).png" alt="Webstore Design" className="w-full" />
                        <p className="text-sm sm:text-base text-center px-10 text-[#6A7080] leading-relaxed mb-2 group-hover:text-white">
                            Build stunning, functional webstores with seamless NetSuite integration.
                        </p>
                    </div>

                    {/* Third Column Split into Two Rows */}
                    <div className="grid lg:grid-rows-2 gap-5 p-auto">
                        {/* Row 1 */}
                        <div className="group h-auto bg-[#FBFBFB] rounded-xl px-5 hover:bg-gradient-to-r from-blue-500 to-blue-700 py-10"
                            data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <h3 className="text-left text-black sm:text-xl md:text-xl lg:text-2xl font-semibold group-hover:text-white">
                                NetSuite Customization
                            </h3>
                            <p className="mt-4 text-sm sm:text-base text-left text-gray-600 leading-relaxed group-hover:text-white">
                                Tailor NetSuite to your unique business needs with custom workflows and features.
                            </p>
                        </div>

                        {/* Row 2 */}
                        <div className="group flex flex-col sm:flex-col md:flex-row bg-[#FBFBFB] rounded-xl px-5 hover:bg-gradient-to-r from-blue-500 to-blue-700"
                            data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <div className="w-full md:w-4/6">
                                <h3 className="text-left text-black py-5 sm:text-xl md:text-xl lg:text-2xl font-semibold group-hover:text-white">
                                    NetSuite Mobility
                                </h3>
                                <p className="mt-4 text-sm sm:text-base text-left text-gray-600 leading-relaxed group-hover:text-white">
                                    Manage your business on the go with mobile-optimized NetSuite solutions.
                                </p>
                            </div>
                            <div className="w-full md:w-2/6 flex justify-center items-center mt-4 md:mt-0">
                                <img src="./images/service (5).png" alt="NetSuite Mobility" className="w-full mt-auto mb-0" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 mt-5">
                    {/* First Section */}
                    <div className="group flex flex-col lg:flex-row items-center bg-[#FBFBFB] rounded-xl p-6 lg:p-8 hover:bg-gradient-to-r from-blue-500 to-blue-700 gap-4 lg:gap-8"
                        data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                        {/* Text Content */}
                        <div className="flex-1 text-left">
                            <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-semibold group-hover:text-white">
                                NetSuite Integration
                            </h3>
                            <p className="mt-4 text-sm sm:text-base text-gray-600 group-hover:text-white">
                                Connect NetSuite to your systems for seamless data flow and enhanced efficiency.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0 w-full lg:w-1/2 xl:w-1/3">
                            <img
                                src="./images/services.png"
                                alt="NetSuite Services"
                                className="w-[376.49px] h-[208px] object-contain mx-auto lg:mx-0"
                            />
                        </div>
                    </div>

                    {/* Second Section */}
                    <div className="group flex flex-col lg:flex-row items-center bg-[#FBFBFB] rounded-xl p-4 lg:p-6 hover:bg-gradient-to-r from-blue-500 to-blue-700 gap-4 lg:gap-8"
                        data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                        {/* Text Content */}
                        <div className="flex-1">
                            <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-semibold text-left group-hover:text-white">
                                NetSuite Implementation
                            </h3>
                            <p className="mt-4 text-sm sm:text-base text-gray-600 text-left leading-relaxed group-hover:text-white">
                                Streamline your transition to NetSuite with expert implementation support.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0 w-full lg:w-1/2 xl:w-1/3">
                            <img
                                src="./images/service (1).png"
                                alt="NetSuite Implementation"
                                className="w-full h-auto object-contain mx-auto lg:mx-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
