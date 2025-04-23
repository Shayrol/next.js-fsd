"use client";

export default function AllHeader() {
  return (
    <>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        날짜
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[36px]">
        내용
      </p>
      <p className="flex justify-center items-center gap-2 w-full font-medium text-[16px] text-gray-900 text-nowrap max-sm:text-xs">
        거래 및 충전 내역
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        잔액
      </p>
    </>
  );
}
