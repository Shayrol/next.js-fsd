import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function Banner() {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1} // 한 슬라이드에 보여주는 화면 개수
      loop={true}
      pagination={{ clickable: true, type: "bullets" }}
      className="w-full h-[516px]" // Swiper 크기 명확히 지정
      autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동으로 넘김
    >
      {["1", "2", "3"].map((num) => (
        <SwiperSlide key={num} className="relative w-full h-full">
          <Image
            src={`/layout/banner/banner-image(${num}).png`}
            alt={`Slide ${num}`}
            fill // 부모 요소에 맞게 이미지 크기 조정
            sizes="100vw"
            className="mx-auto" // 이미지 꽉 채우기
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
