"use client";

import BoardsContents from "./BoardsContents";
import { WriterBoardsButton } from "@/shared/ui/button/write-button";
import SearchOptions from "../../../../shared/ui/searchOption/SearchOptions";

export default function Boards() {
  console.log("Boards 실행");

  return (
    <section className="flex flex-col justify-center items-start gap-6 w-full h-fit">
      <h1 className="font-bold text-[28px]">트립토크 게시판</h1>
      <article className="flex w-full h-full justify-center items-end gap-2 max-lg:flex-col-reverse">
        <SearchOptions />
        <WriterBoardsButton />
      </article>
      <BoardsContents />
    </section>
  );
}
