"use client";

import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const BANNER = ["/"];
  const banner = BANNER.includes(String(pathname));

  return (
    <>
      {banner && (
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={1} // 한 슬라이드에 보여주는 화면 개수
          loop={true}
          pagination={{ clickable: true, type: "bullets" }}
          className="w-full max-w-[1280px] h-[516px] max-sm:max-h-[200px] overflow-hidden rounded-[8px]" // Swiper 크기 명확히 지정
          autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동으로 넘김
        >
          {["1", "2", "3"].map((num) => (
            <SwiperSlide key={num} className="relative w-full h-full">
              <Image
                src={`/layout/banner/banner-image(${num}).png`}
                alt={`Slide ${num}`}
                // fill // 부모 요소에 맞게 이미지 크기 조정
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full mx-auto" // 이미지 꽉 채우기
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
