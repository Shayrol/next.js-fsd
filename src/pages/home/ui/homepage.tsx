import { Boards } from "@/features/Boards/Boards";
import BoardsOfTheBest from "@/features/Boards/BoardsOfTheBest/ui/BoardsOfTheBest";

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
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  // const slug = params.slug;
  const page = Number(searchParams.page) ?? 1; // page를 searchParams에서 추출

  console.log("params: ", params);
  console.log("searchParams: ", searchParams);
  console.log("page: ", page);

  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full">
      <BoardsOfTheBest />
      <Boards page={page} />
    </main>
  );
}
