import { Travelproduct } from "@/entities/api/graphql";
import Image from "next/image";

export default function TravelsBestContents({ el }: { el: Travelproduct }) {
  return (
    <div className="aspect-[1] min-w-[240px] relative bg-gray-200 rounded-[16px] flex items-center justify-center">
      <Image
        src={`https://storage.googleapis.com/${el.images?.[0]}`}
        alt="best-image"
        fill
        className="object-cover rounded-[16px]"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 rounded-[16px]" />

      <div className="absolute top-4 right-4 flex justify-center items-center gap-1 px-2 py-1 rounded-[8px] bg-black/40">
        {/* background image */}
        <Image
          src={"/travel/travels/bookmark.svg"}
          alt="bookmark"
          width={16}
          height={20}
        />
        {/* bookmark */}
        <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
          {el.pickedCount}
        </div>
      </div>
      {/* title */}
      <div className="absolute bottom-5 flex flex-col gap-2 px-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="truncate font-bold text-white text-[24px]">{el.name}</p>
          <h2 className="truncate font-normal text-white text-[14px]">
            {el.remarks}
          </h2>
        </div>
        <p className="flex justify-end items-center font-semibold text-[24px] text-white">
          {el.price?.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
}
