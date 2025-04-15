"use client";

import { PointTransaction } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

export default function AllContents({ data }: { data: PointTransaction[] }) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {data?.map((el) => (
        <Link href={`/travel/${el._id}`} key={el._id}>
          <li className="group relative cursor-pointer flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]">
            {/* 날짜 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {formatDate(el.createdAt)}
            </p>
            {/* 내용 */}
            <p className="w-full font-normal text-[16px] text-gray-900 truncate">
              {el.status ?? "충전"}
            </p>
            {/* 거래 및 충전 내역 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {el.balance?.toLocaleString() ?? "11,000"}원
            </p>
            {/* <div className="flex justify-center items-center max-w-[100px] bg-gray-100">
                <p className="w-[100px] truncate text-center">{el.status}</p>
              </div> */}
            {/* 잔액 */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              {el.amount?.toLocaleString() ?? "22,000"}원
            </p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
