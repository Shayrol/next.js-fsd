"use client";

import BoardsContents from "./BoardsContents";
// import { Query } from "@/entities/api/graphql";
import { WriterBoardsButton } from "@/shared/ui/button/write-button";
import BoardsOptions from "./BoardsOptions";
// import { useSearchParams } from "next/navigation";

// interface IProps {
//   query: {
//     data: Pick<Query, "fetchBoards">;
//     dataCount: Pick<Query, "fetchBoardsCount">;
//   };
// }

export default function Boards() {
  // const data = props.query.data;
  // const count = props.query.dataCount;

  return (
    <section className="flex flex-col justify-center items-start gap-6 w-full h-fit">
      <h1 className="font-bold text-[28px]">트립토크 게시판</h1>
      <article className="flex w-full h-full justify-center items-end gap-2 max-lg:flex-col-reverse">
        <BoardsOptions />
        <WriterBoardsButton />
      </article>
      <BoardsContents />
      {/* <BoardsContents query={{ data, count }} /> */}
    </section>
  );
}
