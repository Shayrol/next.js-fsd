"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchTravelproductsOfTheBest } from "../api/useFetchTravelproductsOfTheBest";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Swiper as SwiperClass } from "swiper"; // Swiper 타입 추가
import Image from "next/image";
import TravelsBestContents from "./tralvels-best-contents";

export default function TravelRecommend() {
  const { data } = useFetchTravelproductsOfTheBest();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  const totalSlides = data?.fetchTravelproductsOfTheBest.length || 0;

  return (
    <section className="flex flex-col gap-6 w-full relative">
      <h1 className="font-bold text-black text-[28px]">
        2025 낭만있게 마무리 하고 싶다면?
      </h1>
      <Swiper
        onSwiper={setSwiperInstance} // Swiper 인스턴스 저장
        modules={[A11y, Navigation]}
        spaceBetween={24}
        slidesPerView={2}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="flex justify-center items-center w-full relative"
      >
        {data?.fetchTravelproductsOfTheBest.map((el) => (
          <SwiperSlide
            key={el._id}
            className="relative w-full flex items-center justify-center"
          >
            <TravelsBestContents el={el} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev 버튼 (첫 번째 슬라이드에서는 숨김) */}
      {activeIndex > 0 && (
        <button
          onClick={() => swiperInstance?.slidePrev()} // Swiper 인스턴스 존재 여부 확인 후 실행
          className="absolute flex justify-center items-center left-[-25px] top-[55%] transform -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10"
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

      {/* Next 버튼 (마지막 슬라이드에서는 숨김) */}
      {activeIndex < totalSlides - 2 && (
        <button
          onClick={() => swiperInstance?.slideNext()} // Swiper 인스턴스 존재 여부 확인 후 실행
          className="absolute flex justify-center items-center right-[-25px] top-[55%] transform -translate-y-1/2 w-10 h-10 bg-white rounded-full z-10"
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

// swiper 모바일 환경 변경하기
