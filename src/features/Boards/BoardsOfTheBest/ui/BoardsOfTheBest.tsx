import { client } from "@/shared/api/apollo-client";
import { BOARDS_OF_THE_BEST } from "../api/usefetchBoardsOfTheBest";
import { Query } from "@/entities/api/graphql";
import BoardsOfTheBestItem from "./BoardsOfTheBestItem";
import Link from "next/link";

export default async function BoardsOfTheBest() {
  // csr 요청 - useQuery가 csr에서 동작하므로 ssr 요청을 하지 못함.
  // const { data, loading } = useFetchBoardsOfTheBest();

  // ssr 요청
  const { data } = await client.query<Pick<Query, "fetchBoardsOfTheBest">>({
    query: BOARDS_OF_THE_BEST,
    // fetchPolicy: "cache-first", // 캐시 없으면 서버 요청(ssr요청 후 캐싱해서 딱히 필요 없음)
  });

  return (
    <section className="flex flex-col gap-6 w-full h-fit  max-xl:max-w-full overflow-hidden">
      <h1 className="font-bold text-[28px]">오늘 핫한 트립토크</h1>
      <section
        className="grid grid-cols-4 max-xl:grid-cols-2 w-full gap-9 
                    max-md:flex max-md:overflow-x-scroll max-md:pr-[10vw] max-md:mr-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {data.fetchBoardsOfTheBest.map((el, index) => (
          <Link
            href={`/${el._id}`}
            key={el._id + index}
            className="shrink-0 p-1 rounded-md"
          >
            <BoardsOfTheBestItem data={el} />
          </Link>
        ))}
      </section>
    </section>
  );
}
