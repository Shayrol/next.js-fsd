"use client";

import { PointTransaction } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";

export default function AllContents({ data }: { data: PointTransaction[] }) {
  return (
    <ul className="flex flex-col gap-3 w-full max-sm:gap-2">
      {data?.map((el) => (
        <li
          key={el._id}
          className="group relative flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px] max-sm:p-2 max-sm:gap-2"
        >
          {/* 날짜 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-sm text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
            {formatDate(el.createdAt)}
          </p>
          {/* 내용 */}
          <p
            className={`flex justify-center items-center min-w-[100px] font-bold text-sm truncate max-sm:min-w-[36px] max-sm:text-xs
                ${el.status === "구매" ? "text-[#F66A6A]" : "text-[#2974E5]"}
              `}
          >
            {el.status}
          </p>
          {/* 거래 및 충전 내역 */}
          <p
            className={`flex justify-center items-center gap-2 w-full font-semibold text-sm max-sm:text-xs
                ${el.status === "구매" ? "text-[#F66A6A]" : "text-[#2974E5]"}
              `}
          >
            {el.status === "구매" ? "" : "+"}
            {el.amount?.toLocaleString()}원
          </p>
          {/* <div className="flex justify-center items-center max-w-[100px] bg-gray-100">
                <p className="w-[100px] truncate text-center">{el.status}</p>
              </div> */}
          {/* 잔액 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-semibold text-sm text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
            {el.balance?.toLocaleString()}원
          </p>
        </li>
      ))}
      <p className="font-semibold text-xs text-black">
        최근 10개의 내역까지만 불러옵니다.
      </p>
    </ul>
  );
}
