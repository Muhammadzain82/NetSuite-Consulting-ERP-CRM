"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

interface Blog {
    id: string;
    attributes: {
      title: string;
      content: Array<{
        type: string;
        image?: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
  }

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [isInView, setIsInView] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }));
      },
      { threshold: 0.5 }
    );

    blogs.forEach((blog) => {
      const container = document.getElementById(blog.id);
      if (container) observer.observe(container);
    });

    return () => {
      blogs.forEach((blog) => {
        const container = document.getElementById(blog.id);
        if (container) observer.unobserve(container);
      });
    };
  }, [blogs]);

  return React.createElement(
    "div",
    { className: "mt-16" },
    blogs.length > 0
      ? blogs.map((blog) => {
          const contentImages = blog.attributes.content.filter(
            (content) => content.type === "image"
          );
          const leftImage = contentImages[0]?.image;
          const rightImage = contentImages[1]?.image || contentImages[0]?.image;

          return React.createElement(
            "div",
            {
              key: blog.id,
              id: blog.id,
              className: `flex justify-center items-center min-h-[350px] bg-[#181815] overflow-hidden mt-16 transition-opacity duration-700 ${
                isInView[blog.id] ? "opacity-100" : "opacity-0"
              }`,
            },
            [
              React.createElement(
                "div",
                {
                  className: "relative w-full sm:w-[90%] md:w-[500px] h-[300px] sm:h-[300px]",
                },
                [
                  leftImage &&
                    React.createElement(
                      "div",
                      {
                        className: `absolute left-0 top-0 w-full sm:w-[80%] md:w-[300px] h-full bg-white bg-opacity-10 border border-white/10 shadow-xl rounded-lg backdrop-blur-lg overflow-hidden transition-transform duration-700 ease-in-out ${
                          isInView[blog.id]
                            ? "sm:-translate-x-[90%] sm:rotate-12"
                            : "translate-x-0"
                        }`,
                      },
                      React.createElement(Image, {
                        src: leftImage.url,
                        alt: leftImage.alternativeText,
                        layout: "fill",
                        objectFit: "cover",
                        quality: 100,
                      })
                    ),
                  rightImage &&
                    React.createElement(
                      "div",
                      {
                        className: `absolute right-0 top-0 w-full sm:w-[80%] md:w-[300px] h-full bg-white bg-opacity-10 border border-white/10 shadow-xl rounded-lg backdrop-blur-lg overflow-hidden transition-transform duration-700 ease-in-out ${
                          isInView[blog.id]
                            ? "sm:translate-x-[90%] sm:-rotate-12"
                            : "translate-x-0"
                        }`,
                      },
                      React.createElement(Image, {
                        src: rightImage.url,
                        alt: rightImage.alternativeText,
                        layout: "fill",
                        objectFit: "cover",
                        quality: 100,
                      })
                    ),
                  React.createElement(
                    "div",
                    {
                      className: "absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0 transition-opacity duration-500 ease-in-out px-4",
                      style: { opacity: isInView[blog.id] ? 1 : 0 },
                    },
                    React.createElement(
                      Link,
                      {
                        href: `/BlogDetail/${blog.id}`,
                        className: "text-center",
                      },
                      React.createElement(
                        "h1",
                        {
                          className:
                            "text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-[#999999] font-['Clash_Display']",
                        },
                        blog.attributes.title
                      )
                    )
                  ),
                ]
              ),
            ]
          );
        })
      : React.createElement(
          "div",
          { className: "text-center text-white" },
          "No blogs available or data is loading..."
        )
  );
}