"use client";

import { Query } from "@/entities/api/graphql";
import KakaoMap from "@/shared/ui/kakao/kakaoMap/kakap-map";

export default function ProductLocation({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const dataLocation = data?.fetchTravelproduct.travelproductAddress;
  const latitude = dataLocation?.lat ?? 0;
  const longitude = dataLocation?.lng ?? 0;
  const title = dataLocation?.addressDetail ?? "";

  console.log("dataLocation: ", dataLocation);

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <p className="font-bold text-[20px] text-gray-800">상세 위치</p>
        {dataLocation !== null ? (
          <div className="flex justify-center items-center w-full h-[300px] rounded-[8px] bg-gray-100">
            <KakaoMap latitude={latitude} longitude={longitude} title={title} />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[300px] rounded-[8px] bg-gray-100">
            등록된 위치가 없습니다.
          </div>
        )}
      </section>
    </>
  );
}
