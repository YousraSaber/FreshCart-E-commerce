"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import img2 from "../../../../public/images/grocery-banner.png";
import img4 from "../../../../public/images/slider-image-2.jpeg";
import img5 from "../../../../public/images/slider-image-3.jpeg";
import Link from "next/link";

export default function MainSlider() {
  return (
    <div className="container my-7 mx-auto w-[90%] flex flex-col gap-4">
      {/* Slider Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
        <span className="text-green-600">Exclusive</span> Deals & Offers
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
        Discover trending products and exclusive deals across categories.
      </p>

      {/* Main Slider */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Slider */}
        <div className="w-full ">
            <Swiper
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{ delay: 2500 }}
            >
              {[img4, img2, img5].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-75 sm:h-90 lg:h-111">

                    <Image
                      priority
                      src={img}
                      fill
                      className="object-cover rounded-lg"
                      alt="main slider"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center">
                      <div className="text-white px-6 md:px-12 max-w-lg">
                        <h3 className="text-2xl md:text-5xl font-bold mb-2">
                          Fresh & Organic Products
                        </h3>
                        <p className="text-sm md:text-base mb-4">
                          Get up to 30% off on selected items
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-md text-white">
                          <Link href={"/products"}>Shop Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          
        </div>

        {/* Side Images */}
        {/* <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2">
          <div className="relative w-1/2 md:w-full h-37 sm:h-44.5 lg:h-55">
            <Image
              priority
              src={img2}
              fill
              className="object-cover rounded-lg"
              alt="side banner"
            />
          </div>
          <div className="relative w-1/2 md:w-full h-37 sm:h-44.5 lg:h-55">
            <Image
              priority
              src={img4}
              fill
              className="object-cover rounded-lg"
              alt="side banner"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
