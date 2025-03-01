// "use client";

import { client } from "@/shared/api/apollo-client";
import { BOARDS_OF_THE_BEST } from "../api/usefetchBoardsOfTheBest";
import { Query } from "@/entities/api/graphql";

export default async function BoardsOfTheBest() {
  // csr 요청 - useQuery가 csr에서 동작하므로 ssr 요청을 하지 못함.
  // const { data, loading } = useFetchBoardsOfTheBest();

  // ssr 요청
  const { data } = await client.query<Pick<Query, "fetchBoardsOfTheBest">>({
    query: BOARDS_OF_THE_BEST,
    fetchPolicy: "cache-first", // 캐시 없으면 서버 요청(ssr요청 후 캐싱해서 딱히 필요 없음)
  });

  console.log(data);
  return (
    <div className="flex">
      {data?.fetchBoardsOfTheBest.map((el, index) => (
        <div key={index}>
          <div>WRITER: {el.writer}</div>
          <div>TITLE: {el.title}</div>
          <div>NAME: {el.user?.name ?? "anonymous"}</div>
        </div>
      ))}
    </div>
  );
}
