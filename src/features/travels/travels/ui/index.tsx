"use client";

import { WriterButton } from "@/shared/ui/button/write-button";
import SearchOptions from "@/shared/ui/searchOption/SearchOptions";
import TravelsOption from "./travels-option";
import TravelsAvailability from "./travels-availability";
import TravelsContents from "./travels-contents";

export default function Travels() {
  return (
    <section className="flex flex-col gap-6 w-full rounded-2xl">
      <p className="font-bold text-[28px] max-sm:text-[18px] text-black">
        여기에서만 예약할 수 있는 숙소
      </p>
      <TravelsAvailability />
      <article className="flex w-full h-full justify-center items-end gap-2 max-lg:flex-col-reverse">
        <SearchOptions />
        <WriterButton name={"숙박권 판매하기"} link={"/travel/new"} />
      </article>
      <TravelsOption />
      <TravelsContents />
    </section>
  );
}

// 여행 목록 구현
// 목록 에러 잡기
