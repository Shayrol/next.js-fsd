// 이미지, 가격, 구매, 판매자 정보 표시

"use client";

import { Query, Travelproduct } from "@/entities/api/graphql";
import Image from "next/image";
import { useState } from "react";
import ProductInfoMobile from "./product-info-mobile";

export default function ProductInfo({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const dataInfo: Travelproduct | undefined = data?.fetchTravelproduct;
  const [pickImage, setPickImage] = useState<number>(0);

  console.log("dataInfo: ", dataInfo);

  const onClickPickImage = (index: number) => {
    setPickImage(index);
  };

  return (
    <>
      <section className="flex gap-6 w-full max-[810px]:hidden">
        {/* main image */}
        {/* {dataInfo?.images ? ( */}
        <div className="relative flex justify-center items-start text-white w-full min-w-[400px] h-full aspect-[4/3] rounded-[8px]">
          <Image
            src={
              dataInfo?.images?.length ?? 0 > 0
                ? `https://storage.googleapis.com/${dataInfo?.images?.[pickImage]}`
                : "/not-images/not-image.svg"
            }
            alt="pick image"
            fill
            // width={640} // 직접 너비 지정
            // height={480} // 4:3 비율 유지
            className="rounded-[8px] aspect-[4/3] object-cover"
          />
        </div>
        {/* ) : (
          <div className="bg-black flex justify-center items-center text-white w-full max-w-[640px] aspect-[4/3] rounded-[8px]">
            main image
          </div>
        )} */}

        {/* side images */}
        <div
          className="flex flex-col gap-4 w-[180px] min-w-[56px] h-[480px] max-lg:h-[240px] overflow-y-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {dataInfo?.images?.length ?? 0 > 0 ? (
            dataInfo?.images?.map((el, index) => (
              <div
                key={el}
                onClick={() => onClickPickImage(index)}
                className="relative w-full aspect-[4/3]" // 👈 w-full로 설정하여 부모 크기에 맞춤
              >
                <Image
                  src={`https://storage.googleapis.com/${el}`}
                  alt="side image"
                  fill // 👈 이미지가 부모 div의 크기에 맞춰지도록 fill 사용
                  className="rounded-[8px] object-cover"
                />
              </div>
            ))
          ) : (
            <div
              className="relative w-full aspect-[4/3]" // 👈 w-full로 설정하여 부모 크기에 맞춤
            >
              <Image
                src={"/not-images/not-image.svg"}
                alt="not-image"
                fill // 👈 이미지가 부모 div의 크기에 맞춰지도록 fill 사용
                className="rounded-[8px] object-cover"
              />
            </div>
          )}
        </div>

        {/* price, seller */}
        <div className="flex flex-col gap-6 w-full max-w-[412px] min-w-[237px]">
          {/* price */}
          <div className="flex flex-col gap-5 w-full p-6 border border-gray-300 rounded-[8px]">
            <div className="flex flex-col gap-2 w-full">
              <p className="font-bold text-[24px] text-black">
                {dataInfo?.price?.toLocaleString()} 원
              </p>
              <ol className="flex flex-col gap-1 w-full px-3">
                <li className="font-normal text-[12px] text-gray-700 leading-[20px]">
                  • 숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                </li>
                <li className="font-normal text-[12px] text-gray-700 leading-[20px]">
                  • 상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                </li>
              </ol>
            </div>
            <button className="flex justify-center items-center gap-2 px-4 py-3 w-full rounded-[8px] font-semibold text-[20px] text-white bg-[#2974E5] hover:bg-[#2974E5]/90">
              구매하기
            </button>
          </div>

          {/* seller */}
          <div className="flex flex-col gap-3 w-full p-6 rounded-[8px] bg-gray-100">
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

      {/* 모바일 */}
      <section className="min-[810px]:hidden">
        <ProductInfoMobile data={dataInfo} />
      </section>
    </>
  );
}

// 이미지 비율 처리 완료
// 가격 및 판매자 비율 처리 및 모바일 환경 ui 구현하기
