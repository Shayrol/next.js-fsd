"use client";

import BoardWriterForm from "@/features/Board/BoardWriter/ui/BoardWriterForm";

export default function BoardEditPage() {
  // 수정 페이지 edit=true

  return (
    <main className="flex flex-col gap-10 w-full">
      <h3 className="w-full h-fit font-bold text-[28px] text-black">
        게시물 수정
      </h3>
      <BoardWriterForm edit={true} />
    </main>
  );
}
