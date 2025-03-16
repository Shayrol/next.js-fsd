import { Query } from "@/entities/api/graphql";
import { Boards } from "@/features/Boards/Boards";
import { BOARDS } from "@/features/Boards/Boards/api/useFetchBoards";
import { BOARDS_COUNT } from "@/features/Boards/Boards/api/useFetchBoardsCount";
import BoardsOfTheBest from "@/features/Boards/BoardsOfTheBest/ui/BoardsOfTheBest";
// import BoardsOfTheBest from "@/features/Boards/BoardsOfTheBest/ui/BoardsOfTheBest";
import { client } from "@/shared/api/apollo-client";

// 타입 정의 (Promise 없이 일반 객체로)
type Params = { slug: string };
type SearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const slug = params.slug;
  const query = searchParams.query;

  // 메타데이터 반환 (필요 시 작성)
  return {
    title: `Home - ${slug || "Default"}`,
    description: query ? `Search: ${query}` : "Default description",
  };
}

export default async function Home({
  // params,
  searchParams,
}: {
  // params: Params;
  searchParams: SearchParams;
}) {
  // const slug = params.slug;

  // 서버 컴포넌트에서 query string 값 가져오기
  const {
    page: pageNumber,
    search: searchString,
    from: fromDate,
    to: toDate,
  } = await searchParams;

  // API 요청 값 가공
  const page = pageNumber ? Number(pageNumber) : 1;
  const search = searchString ? String(searchString) : "";
  const startDate = fromDate ? new Date(String(fromDate)) : undefined;
  const endDate = toDate ? new Date(String(toDate)) : undefined;

  // SSR API 요청 - Boards
  const { data } = await client.query<Pick<Query, "fetchBoards">>({
    query: BOARDS,
    variables: {
      page,
      search,
      startDate,
      endDate,
    },
    fetchPolicy: "network-only",
  });

  // SSR API 요청 - Boards Count
  const { data: dataCount } = await client.query<
    Pick<Query, "fetchBoardsCount">
  >({
    query: BOARDS_COUNT,
    variables: {
      search,
      startDate,
      endDate,
    },
  });

  console.log("Home - data: ", data);
  console.log("Home - count: ", dataCount);
  console.log("Home - startDate: ", startDate);

  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full">
      <BoardsOfTheBest />
      <Boards query={{ data, dataCount }} />
    </main>
  );
}
