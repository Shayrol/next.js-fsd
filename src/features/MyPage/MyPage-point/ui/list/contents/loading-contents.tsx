"use client";

import { PointTransaction } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";

export default function LoadingContents({
  data,
}: {
  data: PointTransaction[];
}) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {data?.map((el) => (
        <li
          key={el._id}
          className="group relative flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]"
        >
          {/* 충전일 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-sm text-gray-900">
            {formatDate(el.createdAt)}
          </p>
          {/* 결제 ID */}
          <p className="w-full font-normal text-sm text-gray-900 truncate">
            {el.impUid?.slice(0, 8)}
          </p>
          {/* 충전내역 */}
          <p
            className={`flex justify-center items-center gap-2 min-w-[100px] font-semibold text-sm text-[#2974E5]`}
          >
            {"+" + el.amount?.toLocaleString()}원
          </p>
          {/* 거래 후 잔액 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-semibold text-sm text-gray-900">
            {el.balance?.toLocaleString()}원
          </p>
        </li>
      ))}
    </ul>
  );
}
