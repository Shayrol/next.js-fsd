"use client";

import { PointTransaction } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import { useFetchPointTransactionsCountOfSelling } from "../../../api/useFetchPointTransactionCountOfSelling";
import Pagination from "@/shared/ui/pagination/pagination";

export default function SellingContents({
  data,
}: {
  data: PointTransaction[];
}) {
  const { data: count } = useFetchPointTransactionsCountOfSelling();
  const SellingCount = count?.fetchPointTransactionsCountOfSelling;

  return (
    <ul className="flex flex-col gap-3 w-full max-sm:gap-2">
      {data?.map((el) => (
        <li
          key={el._id}
          className="group relative flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px] max-sm:p-2 max-sm:gap-2"
        >
          {/* 거래일 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-sm text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
            {formatDate(el.createdAt)}
          </p>
          {/* 상품 명 */}
          <p className="w-full font-normal text-sm text-gray-900 truncate max-sm:text-xs">
            {el.travelproduct?.name}
          </p>
          {/* 거래내역 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-semibold text-sm text-[#2974E5] max-sm:text-xs max-sm:min-w-[60px]">
            +{el.amount?.toLocaleString()}원
          </p>
          {/* 거래 후 잔액 */}
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-semibold text-sm text-gray-900 max-sm:text-xs max-sm:min-w-[80px]">
            {el.balance?.toLocaleString()}원
          </p>
        </li>
      ))}
      <Pagination count={SellingCount} />
    </ul>
  );
}
