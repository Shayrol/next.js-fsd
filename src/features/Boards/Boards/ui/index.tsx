import BoardsSearch from "./Boards-Search";
import BoardsDate from "./Boards-Date";
import BoardsSearchButton from "./Boards-Search-Button";
import WriterBoardsButton from "./Writer-Boards-Button";
import BoardsContents from "./Boards";

export default async function Boards() {
  return (
    <main className="flex flex-col justify-center items-start gap-6 w-full h-fit">
      <h1 className="font-bold text-[28px]">트립토크 게시판</h1>
      <article className="flex w-full">
        <section className="flex gap-4 w-full">
          <BoardsSearch />
          <BoardsDate />
          <BoardsSearchButton />
        </section>
        <WriterBoardsButton />
      </article>
      <BoardsContents />
    </main>
  );
}
