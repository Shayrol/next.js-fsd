"use client";

import { ReplyButton } from "@/shared/ui/button/reply-button";
import { ReplyTextArea } from "@/shared/ui/input/reply-textarea";
import RatingControlled from "@/shared/ui/Rating/rating-controlled";
import Image from "next/image";

export default function ReplyInput() {
  return (
    <article className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-center items-center gap-2 w-full max-w-[60px] h-full max-h-[24px]">
        <Image
          src={"/board/reply/reply.svg"}
          alt="reply-image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
        <p className="w-[28px] font-semibold text-black text-nowrap">댓글</p>
      </div>
      <RatingControlled />
      <section className="flex flex-col items-end gap-4 w-full h-full max-h-[208px]">
        <ReplyTextArea />
        <ReplyButton />
      </section>
    </article>
  );
}
