"use client";

import BoardsContents from "./BoardsContents";
import { WriterButton } from "@/shared/ui/button/write-button";
import SearchOptions from "../../../../shared/ui/searchOption/SearchOptions";

export default function Boards() {
  return (
    <section className="flex flex-col justify-center items-start gap-6 w-full h-fit px-5">
      <h1 className="font-bold text-[28px] max-sm:text-xl">트립토크 게시판</h1>
      <article className="flex w-full h-full justify-center items-end gap-2 max-lg:flex-col-reverse">
        <SearchOptions />
        <WriterButton name={"트립토크 등록"} link={"/board/new"} />
      </article>
      <BoardsContents />
    </section>
  );
}
