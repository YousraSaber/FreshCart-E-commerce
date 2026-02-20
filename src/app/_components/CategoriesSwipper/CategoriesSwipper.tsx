"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Category } from "@/types/product.type";
import Link from "next/link";

export default function CategoriesSwipper({ categories }: { categories: Category[] }) {
  return (
    <>
      <div className="container w-[90%] mx-auto my-10">
        <div className="flex justify-between items-center mt-10 mb-3">
          <h2 className="text-xl md:text-3xl font-bold "><span className="text-green-600">Shop</span> Popoular Categories :</h2>
          <Link href={"/categories"} className="text-md underline text-gray-500">see more..</Link>
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{
            delay: 900,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 5 },
            640: { slidesPerView: 3, spaceBetween: 5 },
            768: { slidesPerView: 4, spaceBetween: 5 },
            1024: { slidesPerView: 7, spaceBetween: 5 },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {categories.map((categ: Category) => {
            return (
              <SwiperSlide key={categ._id}>
                  <Image
                    src={categ.image}
                    className="w-full h-37.5 object-center rounded-lg"
                    alt="category image"
                    width={500}
                    height={500}
                  />
                  <p className="text-center font-semibold p-1">{categ.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>
    </>
  );
}
