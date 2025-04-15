"use client";

export default function BuyingHeader() {
  return (
    <>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        거래일
      </p>
      <p className="flex justify-start items-center gap-2 w-full font-medium text-[16px] text-gray-900">
        상품 명
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        거래내역
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        거래 후 잔액
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
        판매자
      </p>
    </>
  );
}
