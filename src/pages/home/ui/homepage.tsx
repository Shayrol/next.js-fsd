// import { Query } from "@/entities/api/graphql";
import { Boards } from "@/features/Boards/Boards";
// import { BOARDS } from "@/features/Boards/Boards/api/useFetchBoards";
// import { BOARDS_COUNT } from "@/features/Boards/Boards/api/useFetchBoardsCount";
import BoardsOfTheBest from "@/features/Boards/BoardsOfTheBest/ui/BoardsOfTheBest";
// import { client } from "@/shared/api/apollo-client";

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

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full">
      <BoardsOfTheBest />
      <Boards />
    </main>
  );
}
