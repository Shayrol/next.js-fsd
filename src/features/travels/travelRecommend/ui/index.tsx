"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchTravelproductsOfTheBest } from "../api/useFetchTravelproductsOfTheBest";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
import TravelsBestContents from "./tralvels-best-contents";
import Link from "next/link";

export default function TravelRecommend() {
  const { data } = useFetchTravelproductsOfTheBest();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  const totalSlides = data?.fetchTravelproductsOfTheBest.length || 0;

  return (
    <section className="flex flex-col gap-6 w-full relative">
      <h1 className="font-bold text-black text-[28px] max-sm:text-[16px]">
        2025 낭만있게 마무리 하고 싶다면?
      </h1>
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[A11y, Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="flex justify-center items-center w-full relative"
        breakpoints={{
          640: { slidesPerView: 2 }, // 기본 2개
          0: { slidesPerView: 1 }, // 작은 화면에서 가로 슬라이드
        }}
      >
        {data?.fetchTravelproductsOfTheBest.map((el) => (
          <SwiperSlide
            key={el._id}
            className="relative w-full flex items-center justify-center"
          >
            <Link href={`/travel/${el._id}`}>
              <TravelsBestContents el={el} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev 버튼 (작은 화면에서 숨김) */}
      {activeIndex > 0 && (
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute flex justify-center items-center left-[-25px] top-[55%] transform -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10 max-sm:hidden"
          style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <Image
            src={"/pagination/prev.svg"}
            alt="prev"
            width={12}
            height={12}
          />
        </button>
      )}

      {/* Next 버튼 (작은 화면에서 숨김) */}
      {activeIndex < totalSlides - 2 && (
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute flex justify-center items-center right-[-25px] top-[55%] transform -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10 max-sm:hidden"
          style={{ boxShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <Image
            src={"/pagination/next.svg"}
            alt="next"
            width={12}
            height={12}
          />
        </button>
      )}
    </section>
  );
}
