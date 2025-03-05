"use client";

import Link from "next/link";

export default function Pagination() {
  const pageGroupSize = 5;

  // 현재 그룹의 위치 계산 === 1~5 = 1 / 6~10 = 2 / 이전, 다음 페이지 위치 계산
  const currentGroup = Math.ceil(1 / pageGroupSize);
  console.log(currentGroup);

  // 그룹의 시작점 계산 === 다음 페이지 클릭 이동시 시작하는 페이지 번호 계산
  const start = (currentGroup - 1) * pageGroupSize + 1;
  // console.log("start: ", start);
  // 그룹의 마지막 번호 계산
  const end = Math.min(currentGroup * pageGroupSize, 102);
  // console.log("end: ", end);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
  };

  // 이전/다음 그룹으로 이동
  const handlePrevGroup = () => {
    const prevPage = Math.max(start - pageGroupSize, 1);
    handlePageChange(prevPage);
  };

  const handleNextGroup = () => {
    const nextPage = Math.min(end + 1, 102);
    handlePageChange(nextPage);
  };

  return (
    <article>
      {/* 이전 그룹 버튼 */}
      {start > 1 && <button onClick={handlePrevGroup}>이전</button>}
      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNum) => (
        <Link href={`/?page=${pageNum}`} key={pageNum}>
          {pageNum}
        </Link>
      ))}

      {/* 다음 그룹 버튼 */}
      {end < 102 && <button onClick={handleNextGroup}>다음</button>}
    </article>
  );
}

// totalPages === 102로 임시
