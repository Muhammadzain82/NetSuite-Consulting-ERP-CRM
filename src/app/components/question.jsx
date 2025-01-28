"use client"
import React, { useState } from 'react';
import Button from './button';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      id: 1,
      question: 'What is NetSuite ERP and how can it benefit my business?',
      answer:
        'NetSuite ERP is a comprehensive cloud-based enterprise resource planning system that integrates various business functions, including financial management, order processing, inventory control, CRM, and more. It streamlines operations, reduces manual processes, improves decision-making, and supports scalability, making it a valuable tool for businesses looking to enhance efficiency and growth.',
    },
    {
      id: 2,
      question: 'How do I know if NetSuite is the right solution for my business?',
      answer: 'Yes, NetSuite is considered worth the investment for businesses looking for a robust and integrated cloud-based ERP solution. It offers a wide range of features, including financial management, CRM, and e-commerce, which can help streamline operations and improve overall efficiency.',
    },
    {
      id: 3,
      question: 'What industries does NetSuite support?',
      answer: 'Companies, both large and small, are constantly on the lookout for solutions that can streamline their operations, enhance productivity, and drive growth. Oracle NetSuite is at the forefront of enhancing business operations, being the leading cloud-based ERP software, used by over 40,000 companies worldwide.',
    },
    {
      id: 4,
      question: 'How long does it take to implement NetSuite ERP?',
      answer: 'Generally speaking, a NetSuite implementation can take anywhere from three to six months on average. The length of a NetSuite implementation can vary depending on several factors such as the size and complexity of the organization, the scope of the project, and the level of customization required.',
    },
  ];

  return (
    <div className={`${dmSans.className} rounded-lg max-w-8xl mx-5 px-12 my-20`}>
      <div className="mb-8">
        <Button
          bgColor="bg-[#FBFBFB]"
          textColor="text-[#0B56E0]"
          value="FAQ&apos;s"
          className="border border-[#ECECEC] px-8 mb-5 rounded-full"
          data-aos="fade-up"
          data-aos-duration="3000"/>
        <h4 className="text-4xl text-[#00000] my-5" data-aos="fade-up"
            data-aos-duration="3000">
          Frequently Asked <span className="font-bold"> Questions</span>
        </h4>
        <p className="text-[#6A7080]" data-aos="fade-up"
            data-aos-duration="3000">
          Find answers to common questions and learn more about how we can help you.
        </p>
      </div>


      {questions.map((item, index) => (
        <div
          className="accordion flex items-center gap-10 py-6 border-b border-gray-200"
          key={item.id}
          role="accordion"
          data-aos="fade-up"
            data-aos-duration="3000"
        >
          {/* Styled Number */}
          <div className="text-3xl text-[#0B56E0]">{`0${item.id}`}</div>
          <div className="w-full">
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="toggle-button w-full text-base outline-none text-left text-[#00000] flex items-center"
            >
              <span className='font-semibold'>{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-4 h-4 ml-auto text-[#0B56E0] transform transition-transform ${activeIndex === index ? 'rotate-180' : ''
                  }`}
              >
                <path
                  fill="currentColor"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                />
              </svg>
            </button>
            <div
              className={`content transition-all duration-300 overflow-hidden ${activeIndex === index ? 'max-h-screen pb-4' : 'max-h-0 invisible'
                }`}
            >
              <p className="text-sm text-[#6A7080] mt-4 mr-5">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default FAQ;
