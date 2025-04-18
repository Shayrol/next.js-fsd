"use client";

export default function AllHeader() {
  return (
    <>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        날짜
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        내용
      </p>
      <p className="flex justify-center items-center gap-2 w-full font-medium text-[16px] text-gray-900 text-nowrap">
        거래 및 충전 내역
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        잔액
      </p>
    </>
  );
}
