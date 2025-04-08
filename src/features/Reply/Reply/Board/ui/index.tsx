"use client";

import ReplyContents from "./Reply";
import ReplyInput from "./ReplyInput";

export default function Reply({ boardId }: { boardId: string }) {
  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full">
      <ReplyInput boardId={boardId} />
      <ReplyContents boardId={boardId} />
    </section>
  );
}
