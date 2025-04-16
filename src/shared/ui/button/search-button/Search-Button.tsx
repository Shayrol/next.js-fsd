"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { DateRange } from "react-day-picker";

interface IProps {
  search: string;
  date?: DateRange | undefined;
}

function SearchButton({ query }: { query: IProps }) {
  const params = useSearchParams(); // 현재 query string 가져오기
  const router = useRouter();

  const adjustToKst = (date: Date, isStart: boolean): string => {
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로
    const kstDate = new Date(date.getTime() + kstOffset);

    if (isStart) {
      kstDate.setUTCHours(0, 0, 0, 0); // 00:00:00.000 KST
    } else {
      kstDate.setUTCHours(23, 59, 59, 999); // 23:59:59.999 KST
    }

    return kstDate.toISOString();
  };

  const fromDate = query.date?.from ? query.date.from : undefined;
  let toDate = query.date?.to ? query.date.to : undefined;

  // from만 선택된 경우, to를 같은 날 23:59:59로 설정
  if (fromDate && !toDate) {
    toDate = new Date(fromDate); // 같은 날 복사
  }

  const fromUtcDate = fromDate ? adjustToKst(fromDate, true) : undefined;
  const toUtcDate = toDate ? adjustToKst(toDate, false) : undefined;

  const onClickSubmit = async () => {
    // 현재 페이지 경로 유지
    const currentPath = window.location.pathname; // 현재 경로를 가져옴
    const updatedParams = new URLSearchParams(params?.toString());

    // 기존 query string을 그대로 두고, 새로운 값만 업데이트
    if (fromUtcDate) {
      updatedParams.set("from", fromUtcDate);
    } else {
      updatedParams.delete("from"); // from이 없으면 기존 값 삭제
    }

    if (toUtcDate) {
      updatedParams.set("to", toUtcDate);
    } else {
      updatedParams.delete("to"); // to가 없으면 기존 값 삭제
    }

    if (query.search) {
      updatedParams.set("search", query.search);
    } else {
      updatedParams.delete("search"); // search가 없으면 기존 값 삭제
    }

    // page는 1로 고정
    updatedParams.set("page", "1");

    // 새로운 query string으로 URL을 갱신하면서 리다이렉트
    router.replace(`${currentPath}?${updatedParams.toString()}`);
  };

  return (
    <button
      onClick={onClickSubmit}
      className="flex justify-center items-center w-[200px] h-[48px] rounded-[8px] px-4 py-3 gap-2 font-semibold max-md:w-full text-white bg-black hover:bg-black/90"
    >
      검색
    </button>
  );
}

export default React.memo(SearchButton);
