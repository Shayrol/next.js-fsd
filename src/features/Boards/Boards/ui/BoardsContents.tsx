"use client";

import { formatDate } from "@/lib/dateUtils";
import Pagination from "@/shared/ui/pagination/pagination";
import Link from "next/link";
import { useFetchBoards } from "../api/useFetchBoards";
import { useFetchBoardsCount } from "../api/useFetchBoardsCount";
import { useSearchParams } from "next/navigation";
import SkeletonUI from "./SkeletonUI";

export default function BoardsContents() {
  const searchParams = useSearchParams();

  const page: string | null | undefined = searchParams?.get("page");
  const search: string | null | undefined = searchParams?.get("search");
  const startDate: string | null | undefined = searchParams?.get("from");
  const endDate: string | null | undefined = searchParams?.get("to");

  const pageNumber = page ? parseInt(page, 10) : 1; // 페이지 값이 없으면 기본값 1
  const searchQuery = search ? search : ""; // 기본값 빈 문자열
  const start = startDate ? new Date(String(startDate)) : undefined; // 기본값 빈 문자열
  const end = endDate ? new Date(String(endDate)) : undefined; // 기본값 빈 문자열

  const { data, loading } = useFetchBoards({
    page: pageNumber,
    search: searchQuery,
    from: start,
    to: end,
  });
  const { data: count } = useFetchBoardsCount({
    page: pageNumber,
    search: searchQuery,
    from: start,
    to: end,
  });

  return (
    <>
      {!loading ? (
        <article className="flex flex-col justify-center items-center gap-6 px-2 py-6 w-full shadow-lg shadow-[#1c1c1c1c] rounded-2xl">
          <ul className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="flex w-full justify-center items-center max-w-[1280px] gap-3 px-6 py-4">
              <span className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
                번호
              </span>
              <span className="flex w-full max-w-[800px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
                제목
              </span>
              <span className="flex justify-center w-[140px] max-w-[120px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
                작성자
              </span>
              <span className="flex justify-center items-center  w-full max-w-[100px] gap-[10px] font-medium text-nowrap text-[#1c1c1c]">
                날짜
              </span>
            </div>
            <section className="flex flex-col justify-center items-center gap-3 w-full max-w-[1280px] h-fit">
              {data && data.fetchBoards.length > 0 ? (
                data.fetchBoards.map((el) => (
                  <li
                    key={el._id}
                    className="flex justify-center items-center gap-2 w-full  h-[44px] px-6 py-3 border border-gray-300 rounded-xl"
                  >
                    <p className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c] opacity-60">
                      {el._id.slice(-4)}
                    </p>
                    <Link
                      href={`/board/${el._id}`}
                      className="flex w-full max-w-[800px] overflow-hidden"
                    >
                      <h1 className="w-full truncate">{el.title}</h1>
                    </Link>

                    <span className="flex justify-center w-[160px] max-w-[120px] overflow-hidden">
                      <h3 className="w-fit truncate">{el.writer}</h3>
                    </span>

                    <time className="flex justify-center items-center w-full max-w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
                      {formatDate(el.createdAt)}
                    </time>
                  </li>
                ))
              ) : (
                <div className="flex justify-center items-center px-6 py-12 text-[18px] font-medium">
                  검색된 내용이 없습니다.
                </div>
              )}
            </section>
          </ul>
          <Pagination count={count} />
        </article>
      ) : (
        <SkeletonUI />
      )}
    </>
  );
}
