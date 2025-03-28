import { Query } from "@/entities/api/graphql";

export default function ProductHeaderMobile({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  return (
    <header className="flex flex-col gap-2 w-full min-[810px]:hidden">
      <>
        {/* tags */}
        <p className="font-medium text-[16px] text-[#2974E5]">
          {data?.fetchTravelproduct.tags?.join(" ")}
        </p>

        {/* title */}
        <div className="flex justify-between items-center">
          {/* title */}
          <h1 className="font-bold text-[28px] truncate">
            {data?.fetchTravelproduct.name}
          </h1>
        </div>

        {/* remarks */}
        <h2 className="font-medium text-[16px] text-gray-700">
          {data?.fetchTravelproduct.remarks}
        </h2>

        <hr className="border border-black" />

        <p className="flex justify-end font-bold text-[24px] text-black">
          {data?.fetchTravelproduct.price?.toLocaleString()} 원
        </p>
      </>
      <div className="flex justify-center items-center p-3 gap-3 bg-gray-200 rounded-[8px]">
        <ol className="flex flex-col gap-1 w-full px-3">
          <li className="font-normal text-[12px] text-gray-700 leading-[20px]">
            • 숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
          </li>
          <li className="font-normal text-[12px] text-gray-700 leading-[20px]">
            • 상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
          </li>
        </ol>
      </div>
    </header>
  );
}
