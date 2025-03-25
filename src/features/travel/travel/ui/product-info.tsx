// 이미지, 가격, 구매, 판매자 정보 표시

"use client";

import { Query, Travelproduct } from "@/entities/api/graphql";
import Image from "next/image";

export default function ProductInfo({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const dataInfo: Travelproduct | undefined = data?.fetchTravelproduct;

  return (
    <section className="flex gap-6 w-full">
      {/* main image */}
      <div className="bg-black flex justify-center items-center text-white w-[640px] h-[640px] rounded-[8px]">
        main image
      </div>

      {/* side images */}
      <div className="flex flex-col gap-4 min-w-[180px] min-h-[180px]">
        <div className="bg-black flex justify-center items-center text-white w-full h-[136px] rounded-[8px]">
          image
        </div>
        <div className="bg-black flex justify-center items-center text-white w-full h-[136px] rounded-[8px]">
          image
        </div>
        <div className="bg-black flex justify-center items-center text-white w-full h-[136px] rounded-[8px]">
          image
        </div>
        <div className="bg-black flex justify-center items-center text-white w-full h-[136px] rounded-[8px]">
          image
        </div>
      </div>

      {/* price, seller */}
      <div className="flex flex-col gap-6 min-w-[412px]">
        {/* price */}
        <div className="flex flex-col gap-5 w-full p-6 border border-gray-300 rounded-[8px]">
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold text-[24px] text-black">
              {dataInfo?.price?.toLocaleString()} 원
            </p>
            <div className="flex flex-col gap-1 w-full px-3">
              <p className="font-normal text-[12px] text-gray-700 text-nowrap leading-[20px]">
                • 숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
              </p>
              <p className="font-normal text-[12px] text-gray-700 leading-[20px]">
                • 상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
              </p>
            </div>
          </div>
          <button className="flex justify-center items-center gap-2 px-4 py-3 w-full rounded-[8px] font-semibold text-[20px] text-white bg-[#2974E5] hover:bg-[#2974E5]/90">
            구매하기
          </button>
        </div>

        {/* seller */}
        <div className="flex flex-col gap-3 w-full p-6 rounded-[8px] bg-gray-50">
          <p className="font-bold text-[20px] text-black">판매자</p>
          <div className="flex items-center gap-1 w-full">
            <Image
              src={
                dataInfo?.seller?.picture
                  ? `https://storage.googleapis.com/${dataInfo?.seller?.picture}`
                  : "/not-images/not-profile.svg"
              }
              alt="profile"
              width={40}
              height={40}
            />
            <p className="font-medium text-[16px] text-gray-800">
              {dataInfo?.seller?.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
