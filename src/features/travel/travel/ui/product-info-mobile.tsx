"use client";

import { Travelproduct } from "@/entities/api/graphql";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
// import Image from "next/image";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductInfoMobile({
  data,
}: {
  data: Travelproduct | undefined;
}) {
  const { user } = useUserStore();
  const images = data?.images?.length;

  return (
    <section className="flex flex-col w-full">
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        className="flex justify-center items-center w-full relative"
      >
        {data?.images?.length ?? 0 > 0 ? (
          data?.images?.map((el, index) => (
            <SwiperSlide key={el}>
              <div className="aspect-[16/9] w-full relative">
                <Image
                  src={`https://storage.googleapis.com/${el}`}
                  alt="main image"
                  fill
                  className="object-cover"
                />
                <div className="absolute flex gap-1 px-2 py-1 bottom-[20px] right-[20px] font-medium text-gray-50 text-[12px] rounded-full bg-black/60">
                  {index + 1}/{images}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="aspect-[16/9] w-full relative">
              <Image
                src={"/not-images/not-image.svg"}
                alt="main image"
                fill
                className="object-cover"
              />
              <div className="absolute flex gap-1 px-2 py-1 bottom-[20px] right-[20px] font-medium text-gray-50 text-[12px] rounded-full bg-black/60">
                {1}/{1}
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* profile */}
      <section className="flex justify-between items-center w-full px-5 py-3 bg-gray-900">
        <div className="flex gap-1">
          <Image
            src={
              data?.seller?.picture
                ? `https://storage.googleapis.com/${data?.seller?.picture}`
                : "/not-images/not-profile.svg"
            }
            alt="profile"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <p className="font-light text-[14px] text-white">
            {data?.seller?.name}
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 ml-5">
          {/* delete */}
          {user?._id === data?.seller?._id ? (
            <button className="flex justify-center items-center min-w-6">
              <Image
                src={"/travel/travel/travel-delete.svg"}
                alt="delete"
                width={15}
                height={17}
                className="filter invert"
              />
            </button>
          ) : (
            <></>
          )}
          {/* link */}
          <button className="flex justify-center items-center min-w-6">
            <Image
              src={"/travel/travel/travel-link.svg"}
              alt="link"
              width={19}
              height={9}
              className="filter invert"
            />
          </button>
          {/* location */}
          <button className="flex justify-center items-center min-w-6">
            <Image
              src={"/travel/travel/travel-location.svg"}
              alt="location"
              width={15}
              height={18.5}
              className="filter invert"
            />
          </button>

          {/* bookmark */}
          <div className="flex justify-center items-center gap-1 min-w-[53px] px-2 py-1 rounded-[8px] bg-black/40">
            <Image
              src={"/travel/travels/bookmark.svg"}
              alt="bookmark"
              width={16}
              height={20}
              className=""
            />
            <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
              {data?.pickedCount}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
