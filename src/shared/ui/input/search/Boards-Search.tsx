"use client";

import Image from "next/image";

export default function BoardsSearch() {
  return (
    <div className="flex w-full min-w-[180px] max-w-[640px] rounded-[8px] gap-2 p-3 relative bg-gray-50 hover:bg-gray-100/90">
      <Image
        src={"/vote/main-search.svg"}
        alt="search-image"
        width={17.58}
        height={17.58}
        className="min-w-[17.58px]"
      />
      <input
        type="text"
        placeholder="제목을 검색해 주세요."
        className="w-[584px] min-w-[140px] h-[24px] font-normal text-gray-500 bg-transparent outline-none"
      />
    </div>
  );
}
