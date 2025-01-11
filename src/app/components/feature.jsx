import React from 'react'
import Button from './button';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const Feature = () => {
    return (
        <div className={`${dmSans.className} bg-gradient-to-r from-blue-500 to-blue-700 my-10 py-12`}>
            <div className="max-w-full max-md:max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-8 md:gap-y-12 lg:grid-cols-2">
                    {/* Left side - Image */}
                    <div className="flex justify-center">
                        <img src="./images/Group 58.png" alt="" />
                    </div>

                    {/* Right side - Text */}
                    <div className="text-white px-8">
                        {/* Button */}
                        <Button
                            bgColor="bg-[#FBFBFB47]"
                            textColor="text-white"
                            value="Features"
                            className="border border-white rounded-full px-8"
                        />

                        {/* Heading */}
                        <h1 className="text-5xl text-white mt-10">
                            Key Features of <span className="bg-white text-5xl text-transparent bg-clip-text font-bold">NetSuite ERP</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl text-white my-10">
                            NetSuite ERP offers a comprehensive suite of tools, including financial management, inventory tracking, order management, CRM integration, and advanced reporting. Designed to streamline operations, enhance decision-making, and support global scalability, it’s the ultimate solution for driving business growth and efficiency.
                        </p>

                        {/* List of Features */}
                        <ul className="flex flex-wrap gap-5 my-5 list-disc pl-5">
                            <li className="w-full sm:w-[45%]">
                                <div>
                                    <h4 className="text-xl font-semibold">Financial Management</h4>
                                    <p>
                                        Simplify finances with tools for ledger, payables/receivables, planning, and revenue tracking.
                                    </p>
                                </div>
                            </li>
                            <li className="w-full sm:w-[45%]">
                                <div>
                                    <h4 className="text-xl font-semibold">E-Commerce Integration</h4>
                                    <p>
                                        E-Commerce Integration in NetSuite ERP streamlines online transactions and store management.
                                    </p>
                                </div>
                            </li>
                            <li className="w-full sm:w-[45%]">
                                <div>
                                    <h4 className="text-xl font-semibold">Reporting and Analytics</h4>
                                    <p>
                                        NetSuite ERP offers real-time dashboards, advanced reports, and KPI monitoring for insights.
                                    </p>
                                </div>
                            </li>
                            <li className="w-full sm:w-[45%]">
                                <div>
                                    <h4 className="text-xl font-semibold">Project Management</h4>
                                    <p>
                                        NetSuite ERP simplifies resource allocation, budget tracking, and time/expense management.
                                    </p>
                                </div>
                            </li>
                        </ul>


                        <Button
                            bgColor="bg-white"
                            textColor="text-[#0B56E0]"
                            value="Book Consultation"
                            className="border border-[#0B56E0] rounded-lg mt-8 font-bold"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature;
