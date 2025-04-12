"use client";

import Image from "next/image";

export default function ActivityContents() {
  return (
    <section
      style={{ boxShadow: "0px 0px 20px 0px #00000014" }}
      className="flex flex-col gap-6 px-12 py-6 w-full rounded-[16px]"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* list header */}
        <div className="flex gap-2 px-6 py-4 w-full">
          <p className="flex justify-center items-center gap-2 min-w-[64px] font-medium text-[16px] text-gray-900">
            번호
          </p>
          <p className="flex justify-start items-center gap-2 w-full font-medium text-[16px] text-gray-900">
            상품
          </p>
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
            판매가격
          </p>
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
            판매자
          </p>
          <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
            날짜
          </p>
        </div>

        {/* list contents */}
        <ul className="flex flex-col gap-3 w-full">
          <li className="group relative cursor-pointer flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]">
            {/* _id */}
            <p className="flex justify-center items-center gap-2 min-w-[64px] font-normal text-[16px] text-gray-900">
              1
            </p>
            {/* name */}
            <p className="w-full font-normal text-[16px] text-gray-900 truncate">
              상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명
            </p>
            {/* price */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              100,000원
            </p>
            {/* seller - 가운데 정렬 + ... 처리 */}
            <div className="flex justify-center items-center max-w-[100px] bg-gray-100">
              <p className="w-[100px] truncate text-center">정말정</p>
            </div>
            {/* createdAt */}
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
              2023.01.01
            </p>
            {/* delete */}
            <button className="absolute right-1.5 hidden group-hover:block transition-opacity duration-200">
              <Image
                src="/mypage/delete.svg"
                alt="trash"
                width={24}
                height={24}
              />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
