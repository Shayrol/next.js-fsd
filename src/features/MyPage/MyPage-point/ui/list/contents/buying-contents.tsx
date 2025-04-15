"use client";

import { PointTransaction } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

export default function BuyingContents({ data }: { data: PointTransaction[] }) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {data?.map((el) => (
        <Link href={`/travel/${el._id}`} key={el._id}>
          <li className="group relative cursor-pointer flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]">
            {/* 거래일 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {formatDate(el.createdAt)}
            </p>
            {/* 상품 명 */}
            <p className="w-full font-normal text-[16px] text-gray-900 truncate">
              {el.travelproduct?.name}
            </p>
            {/* 거래내역 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {el.balance?.toLocaleString() ?? "11,000"}원
            </p>
            {/* 거래 후 잔액 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {el.amount?.toLocaleString() ?? "22,000"}원
            </p>
            {/* 판매자 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {"판매자"}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
