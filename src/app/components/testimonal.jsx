import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const Testimonal = () => {
    return (
        <>
            <div className={`${dmSans.className} my-10`}>
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 my-10 pt-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-start lg:items-end gap-10 mb-0">
                            {/* Left side - Testimonial Card */}
                            <div className="order-2 lg:order-1 flex items-end">
                                <div className="bg-white rounded-t-lg p-10 w-full">
                                    <img src="./images/icon.png" alt="" />
                                    <p className="text-[#514F6E] text-sm mb-4 leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco
                                    </p>
                                    <div className="flex justify-between items-center mt-6">
                                        <div>
                                            <h4 className="text-[#151313] font-semibold">Mike Warren</h4>
                                            <p className="text-[#A1A0A6] text-sm">Product Developer at Webflow</p>
                                        </div>
                                        <p className="text-[#A1A0A6] text-sm">14/Dec/2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Text */}
                            <div className="order-1 lg:order-2 text-white pb-12 pl-10 lg:pb-0">
                                <button className="bg-[#ECECEC] text-[#0B56E0] rounded-full px-10 py-2 text-sm mb-6">
                                    Testimonials
                                </button>
                                <h1 className="text-4xl lg:text-5xl font-semibold">
                                    What Our Clients <span className="bg-white text-transparent bg-clip-text font-bold">Say About Us</span>
                                </h1>
                                <p className="text-white mt-6 mb-10 leading-relaxed max-w-md">
                                    Hear from our satisfied clients about how we&apos;ve helped them achieve their goals with tailored solutions.
                                </p>
                                <h1 className="text-5xl font-bold mb-2">500+</h1>
                                <p className="text-lg">Happy Clients</p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex bg-white px-5 rounded-lg shadow">
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <IoIosArrowBack size={30} className="text-blue-500" />
                        </button>
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-2">
                            <IoIosArrowForward size={30} className="text-blue-500" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonal;
