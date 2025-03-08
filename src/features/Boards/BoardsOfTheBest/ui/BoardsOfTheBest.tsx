import { client } from "@/shared/api/apollo-client";
import { BOARDS_OF_THE_BEST } from "../api/usefetchBoardsOfTheBest";
import { Query } from "@/entities/api/graphql";
import BoardsOfTheBestItem from "./BoardsOfTheBestItem";
import Link from "next/link";
import React from "react";

const BoardsOfTheBest = async () => {
  // ssr 요청
  const { data } = await client.query<Pick<Query, "fetchBoardsOfTheBest">>({
    query: BOARDS_OF_THE_BEST,
  });

  return (
    <section className="flex flex-col gap-6 w-full h-fit max-xl:max-w-full overflow-hidden">
      <h1 className="font-bold text-[28px]">오늘 핫한 트립토크</h1>
      <section
        className="grid grid-cols-4 max-xl:grid-cols-2 w-full gap-9 
                    max-md:flex max-md:overflow-x-scroll max-md:pr-[10vw] max-md:mr-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {data?.fetchBoardsOfTheBest.map((el, index) => (
          <Link
            href={`/board/${el._id}`}
            key={el._id + index}
            className="shrink-0 p-1 rounded-md"
          >
            <BoardsOfTheBestItem data={el} />
          </Link>
        ))}
      </section>
    </section>
  );
};

export default BoardsOfTheBest;
