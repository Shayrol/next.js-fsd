"use client";

import { Query } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Pagination from "@/shared/ui/pagination/pagination";
import Link from "next/link";

interface IProps {
  query: {
    data: Pick<Query, "fetchBoards"> | undefined;
    count: Pick<Query, "fetchBoardsCount"> | undefined;
  };
}

export default function BoardsContents(props: IProps) {
  const count = props.query.count?.fetchBoardsCount;

  return (
    <article className="flex flex-col justify-center items-center gap-6 px-12 py-6 w-full border shadow-lg shadow-[#1c1c1c1c] rounded-2xl">
      <ul className="flex flex-col gap-2 w-full">
        <div className="flex w-full max-w-[1184px] gap-3 px-6 py-4">
          <span className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c]">
            번호
          </span>
          <span className="flex justify-start items-center w-full max-w-[820px] gap-[10px] font-medium text-[#1c1c1c]">
            제목
          </span>
          <span className="flex justify-center items-center w-[220px] gap-[10px] font-medium text-[#1c1c1c]">
            작성자
          </span>
          <span className="flex justify-center items-center  w-full max-w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
            날짜
          </span>
        </div>
        <section className="flex flex-col gap-3 w-full max-w-[1184px] h-fit">
          {props.query.data?.fetchBoards &&
          props.query.data.fetchBoards.length > 0 ? (
            props.query.data.fetchBoards.map((el) => (
              <li
                key={el._id}
                className="flex justify-start items-center gap-2 w-full max-w-[1184px] h-[44px] px-6 py-3 border border-[#f2f2f2] rounded-xl"
              >
                <p className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c] opacity-60">
                  {el._id.slice(-4)}
                </p>
                <Link
                  href={`/${el._id}`}
                  className="w-full max-w-[848px] hover:underline"
                >
                  <span className="flex justify-start items-center w-full max-w-[820px] gap-[10px] font-medium text-[#1c1c1c] line-clamp-1 overflow-hidden">
                    {el.title}
                  </span>
                </Link>
                <h3 className="flex justify-center items-center w-[220px] gap-[10px] font-medium text-[#1c1c1c] opacity-80">
                  {el.writer}
                </h3>

                <time className="flex justify-center items-center w-full max-w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
                  {formatDate(el.createdAt)}
                </time>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center px-6 py-12 text-[18px] font-medium">
              내용이 없습니다.
            </div>
          )}
        </section>
      </ul>
      <Pagination query={{ count }} />
    </article>
  );
}
