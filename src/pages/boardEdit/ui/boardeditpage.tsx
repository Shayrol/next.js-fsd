"use client";

import { useFetchBoard } from "@/features/Board/Board/api/useFetchBoard";
import BoardWriterForm from "@/features/Board/BoardWriter/ui/BoardWriterForm";
import { useParams } from "next/navigation";

export default function BoardEditPage() {
  // 수정 페이지 edit=true
  const params = useParams();
  const boardId = String(params?.boardId);
  const { data } = useFetchBoard(boardId);

  return (
    <main className="flex flex-col gap-10 w-full">
      <h3 className="w-full h-fit font-bold text-[28px] text-black">
        게시물 수정
      </h3>
      <BoardWriterForm edit={true} data={data} />
    </main>
  );
}
