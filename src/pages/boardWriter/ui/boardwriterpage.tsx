"use client";

import { BoardWriter } from "@/features/Board/BoardWriter";

export default function BoardWriterPage() {
  return (
    <main className="flex justify-center items-center w-full max-w-[1280px] h-full border border-red-500">
      <BoardWriter />
    </main>
  );
}
