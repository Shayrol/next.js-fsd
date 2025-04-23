"use client";

export default function LoadingHeader() {
  return (
    <>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        충전일
      </p>
      <p className="flex justify-center items-center gap-2 w-full font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        결제 ID
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[60px]">
        충전내역
      </p>
      <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900 max-sm:text-xs max-sm:min-w-[80px]">
        거래 후 잔액
      </p>
    </>
  );
}
