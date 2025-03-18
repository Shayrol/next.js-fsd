"use client";

import { Query } from "@/entities/api/graphql";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

interface IProps {
  count?: Pick<Query, "fetchBoardsCount"> | undefined;
}

export default function Pagination(props: IProps) {
  const router = useRouter();
  const isClicked = useRef(false);
  const pathname = usePathname();

  // 쿼리스트링 페이지
  const searchParamsPage = useSearchParams();
  const page = searchParamsPage?.get("page");

  // queryString page / 현재페이지 불러오기 없으면 1page
  const pageNumber = page ? parseInt(page, 10) : 1;
  // 첫 번째 page 1, 11, 21...
  const startPageNum = Math.floor((pageNumber - 1) / 10) * 10 + 1;
  // 첫 번째 page 저장(이전, 다음 페이지 이동 및 계산을 위함)
  const [startPage, setStartPage] = useState(startPageNum);
  // 마지막 page 번호 불러오기 (총860개 일때 86 반환)
  const lastPage = Math.ceil((props.count?.fetchBoardsCount ?? 10) / 10);
  console.log("count: ", props.count?.fetchBoardsCount);
  console.log("now-count: ", startPage);
  console.log("lastPage: ", lastPage);
  const searchParams = useSearchParams();

  const PrevPageChange = () => {
    if (startPage === 1 || isClicked.current) return;

    isClicked.current = true; // 클릭 방지
    const PrevPage = startPage - 10;

    setStartPage(PrevPage);
    handlePageChange(PrevPage);

    setTimeout(() => {
      isClicked.current = false; // 0.5초 후 클릭 가능
    }, 500);
  };

  const NextPageChange = () => {
    if (startPage + 10 > lastPage || isClicked.current) return;

    isClicked.current = true;
    const nextPage = startPage + 10;

    setStartPage(nextPage);
    handlePageChange(nextPage);

    setTimeout(() => {
      isClicked.current = false;
    }, 300);
  };

  const handlePageChange = (page: number) => {
    if (pageNumber === page) return;
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", page.toString());

    // 리렌더링 없이 query string 수정 - 이전 router.push의 shallow 옵션
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
      // shallow: true,
    });
  };

  return (
    <article className="flex w-full h-full max-h-[32px]">
      {lastPage !== 0 ? (
        <ul className="flex flex-row justify-center items-center gap-2 w-full h-full">
          <li
            onClick={PrevPageChange}
            className="flex justify-center items-center cursor-pointer size-6"
          >
            <Image
              src="/pagination/prev.svg"
              alt="next-pagination"
              width={0}
              height={0}
              sizes="100vw"
              className={`
              w-[6.55px] h-[11.15px]
              filter ${
                startPage !== 1
                  ? "brightness-50"
                  : "brightness-200 invert contrast-150"
              }`}
            />
          </li>
          <span className="flex flex-row justify-center items-center gap-4 w-fit h-[32px]">
            {new Array(10).fill(1).map((el, index) => {
              if (index + startPage <= lastPage) {
                return (
                  <li
                    key={index + startPage}
                    onClick={() => handlePageChange(index + startPage)}
                    className={`
                    flex justify-center items-center size-8 rounded-[8px] p-[10px] cursor-pointer 
                    gap-[10px] hover:bg-[#f2f2f2] hover:text-black
                    ${
                      pageNumber === index + startPage
                        ? "bg-[#f2f2f2] text-black font-medium"
                        : "bg-none text-[#777777] font-normal"
                    }
                    `}
                  >
                    {index + startPage}
                  </li>
                );
              }
            })}
          </span>
          <li
            onClick={NextPageChange}
            className="flex justify-center items-center cursor-pointer size-6"
          >
            <Image
              src="/pagination/next.svg"
              alt="next-pagination"
              width={0}
              height={0}
              sizes="100vw"
              className={`
              w-[6.55px] h-[11.15px]
              filter ${
                startPage + 10 <= lastPage
                  ? "brightness-50"
                  : "brightness-200 invert contrast-150"
              }`}
            />
          </li>
        </ul>
      ) : (
        <></>
      )}
    </article>
  );
}
