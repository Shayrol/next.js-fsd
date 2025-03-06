import BoardsContents from "./BoardsContents";
import { client } from "@/shared/api/apollo-client";
import { BOARDS } from "../api/useFetchBoards";
import { Query } from "@/entities/api/graphql";
import { DatePickerWithRange } from "@/shared/ui/input/datePicker";
import { BoardsSearchButton } from "@/shared/ui/button/search-button";
import { BoardsSearch } from "@/shared/ui/input/search";
import { WriterBoardsButton } from "@/shared/ui/button/write-button";
import { BOARDS_COUNT } from "../api/useFetchBoardsCount";

export default async function Boards({ page }: { page: number }) {
  const { data } = await client.query<Pick<Query, "fetchBoards">>({
    query: BOARDS,
    variables: { page },
  });

  const { data: dataCount } = await client.query<
    Pick<Query, "fetchBoardsCount">
  >({
    query: BOARDS_COUNT,
  });

  const totalPages = dataCount.fetchBoardsCount;

  return (
    <section className="flex flex-col justify-center items-start gap-6 w-full min-w-[640px] h-fit">
      <h1 className="font-bold text-[28px]">트립토크 게시판</h1>
      <article className="flex w-full h-fit min-w-[640px] gap-2">
        <section className="flex gap-4 w-full min-w-[640px]">
          <DatePickerWithRange />
          <BoardsSearch />
          <BoardsSearchButton />
        </section>
        <WriterBoardsButton />
      </article>
      <BoardsContents query={{ data, page, totalPages }} />
    </section>
  );
}
