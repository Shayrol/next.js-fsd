"use client";

export default function SellingHeader() {
  return (
    <>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        거래일
      </p>
      <p className="flex justify-start items-center gap-2 w-full font-medium text-[16px] text-gray-900 max-sm:text-xs">
        상품 명
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        거래내역
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[80px]">
        거래 후 잔액
      </p>
    </>
  );
}
