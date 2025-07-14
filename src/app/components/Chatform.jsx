"use client";
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import Modal from './Modal';
import Chat from './chat';
import AOS from 'aos';
import 'aos/dist/aos.css';

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const Chatform = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div
            className={`${dmSans.className} mt-20 flex items-center justify-center rounded-lg h-[80vh] w-[90%] mx-auto bg-gray-50`}>
            <div className="flex items-center justify-center w-full h-full">
                <div className="max-w-lg w-full px-8 py-20 text-center"
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-center">
                    <h2 className="text-6xl text-gray-800 leading-15">
                        Bring <span className="font-bold">Your <br /> Ideas</span>
                        <span className="text-blue-600 font-bold"> to Life</span>
                    </h2>
                    <p className="mt-6 text-gray-600">
                        Collaborate with us to explore how NetSuite can transform your
                        business processes and drive success.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md shadow-md hover:bg-blue-700"
                    >
                        Book Consultation
                    </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Chat />
            </Modal>
        </div>
    )
}

export default Chatform