"use client";

import BoardContents from "./BoardContents";

export default function Board({ boardId }: { boardId: string }) {
  return (
    <section className="flex flex-col justify-center items-center w-full gap-6 px-5">
      <BoardContents boardId={boardId} />
    </section>
  );
}
