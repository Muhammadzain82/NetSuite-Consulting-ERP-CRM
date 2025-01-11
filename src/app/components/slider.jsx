import React from "react";

const Slider = () => {
    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
        "/images/6.png",
        "/images/7.png",
        "/images/8.png",
    ];

    return (
        <div className="overflow-hidden w-full my-20">
            <div className="flex animate-marquee space-x-6">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slider Image ${index + 1}`}
                        className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain"
                    />
                ))}
                {/* Duplicate the images to create a seamless effect */}
                {images.map((src, index) => (
                    <img
                        key={`duplicate-${index}`}
                        src={src}
                        alt={`Slider Duplicate Image ${index + 1}`}
                        className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
