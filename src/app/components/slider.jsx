import React from "react";

const Slider = () => {
    const images = [
        "/images-webp/1.webp",
        "/images-webp/2.webp",
        "/images-webp/3.webp",
        "/images-webp/4.webp",
        "/images-webp/5.webp",
        "/images-webp/6.webp",
        "/images-webp/7.webp",
        "/images-webp/8.webp",
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
