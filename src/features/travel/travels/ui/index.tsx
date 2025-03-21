import { WriterBoardsButton } from "@/shared/ui/button/write-button";
import SearchOptions from "@/shared/ui/searchOption/SearchOptions";

export default function Travels() {
  return (
    <section className="flex flex-col gap-6 w-full rounded-2xl">
      <p>여기에서만 예약할 수 있는 숙소</p>
      <div className="flex gap-4">
        <button className="px-4 py-3 gap[10px] bg-black text-white rounded-[8px]">
          예약 가능 숙소
        </button>
        <button className="px-4 py-3 gap[10px] bg-gray-200/90 text-black rounded-[8px]">
          예약 마감 숙소
        </button>
      </div>
      <article className="flex w-full h-full justify-center items-end gap-2 max-lg:flex-col-reverse">
        <SearchOptions />
        <WriterBoardsButton />
      </article>
    </section>
  );
}

// 여행 목록 구현
