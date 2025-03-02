"use client";

import { Board } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";
// import Link from "next/link";

interface IProps {
  data: Board;
}

export default function BoardsOfTheBestItem(props: IProps) {
  const data = props.data;

  return (
    <section className="flex gap-4 w-full h-[152px] border border-green-400 hover:bg-gray-100 rounded-sm">
      {/* 게시물 이미지 */}
      <Image
        src={data.images?.[0] ?? "/not-images/not-image.svg"}
        alt="BoardsImage"
        width={112}
        height={152}
        className="rounded-sm object-cover"
      />

      {/* 게시물 정보 */}
      <article className="flex flex-col justify-between w-full">
        {/* 제목, 작성자 */}
        <header className="flex flex-col gap-3 w-full h-[80px]">
          {/* 제목 */}
          <h2 className="font-bold w-full line-clamp-1 overflow-hidden">
            {data.title ?? "null"}
          </h2>

          {/* 작성자 */}
          <section className="flex items-center gap-1">
            <Image
              src={data.user?.picture ?? "/not-images/not-profile.svg"}
              alt="profile"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-sm w-[24px] h-[24px] object-cover"
            />

            <div className="text-[14px] text-gray-500">
              {data.writer ?? "null"}
            </div>
          </section>
        </header>

        {/* 좋아요, 등록일 */}
        <section className="flex justify-between items-center h-[24px]">
          {/* 좋아요 */}
          <section className="flex items-center justify-center gap-1">
            <Image
              src={"/vote/main-like.svg"}
              alt="like-count"
              width={19}
              height={0}
            />
            <div className="text-[14px] text-red-500">
              {data.likeCount ?? "000"}
            </div>
          </section>

          {/* 등록일 */}
          <time className="text-[14px] font-normal text-gray-600">
            {formatDate(data.createdAt) ?? "0000.00.00"}
          </time>
        </section>
      </article>
    </section>
  );
}
