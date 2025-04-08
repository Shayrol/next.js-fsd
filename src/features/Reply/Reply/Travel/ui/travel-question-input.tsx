// 댓글 입력 공간

"use client";

import Image from "next/image";
import TravelInput from "./travel-input";

export default function TravelQuestionInput({
  travelId,
}: {
  travelId: string;
}) {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex justify-start items-center gap-2">
        <Image
          src={"/reply/reply.svg"}
          alt="reply-image"
          width={24}
          height={24}
        />
        <p className="font-semibold text-[16px] text-black">문의하기</p>
      </div>
      <TravelInput travelId={travelId} />
    </section>
  );
}
