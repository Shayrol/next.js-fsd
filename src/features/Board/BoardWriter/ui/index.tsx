"use client";

import BoardWriterForm from "./BoardWriterForm";

export default function BoardWriter() {
  return (
    <article className="flex flex-col gap-10 w-full">
      <h3 className="w-full h-fit font-bold text-[28px] text-black">
        게시물 등록
      </h3>
      <BoardWriterForm />
    </article>
  );
}
