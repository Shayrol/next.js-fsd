"use client";

import { Board } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";

interface IProps {
  data: Board;
}

export default function BoardsOfTheBestItem(props: IProps) {
  const data = props.data;

  return (
    <section className="flex gap-2 w-full h-[152px] max-md:w-[280px]">
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
        <header className="flex flex-col gap-2 w-fit h-fit">
          {/* 제목 */}
          <h2 className="font-bold  leading-6 tracking-normal h-[48px] line-clamp-2 overflow-hidden">
            {data.title ?? "null"}
          </h2>

          {/* 작성자 */}
          <section className="flex items-center gap-1 w-fit">
            <Image
              src={data.user?.picture ?? "/not-images/not-profile.svg"}
              alt="profile"
              width={0}
              height={0}
              sizes="100vw"
              className="w-6 h-6"
            />

            <div className="  leading-5 tracking-normal font-light w-fit h-[20px] text-gray-500">
              {data.writer ?? "null"}
            </div>
          </section>
        </header>

        {/* 좋아요, 등록일 */}
        <section className="flex justify-between w-full h-fit">
          {/* 좋아요 */}
          <section className="flex gap-1 w-fit h-fit">
            <Image
              src={"/vote/main-like.svg"}
              alt="like-count"
              width={0}
              height={0}
              sizes="100vw"
              className="w-6 h-6"
            />
            <div className="w-[17px] h-[20px]  leading-5 tracking-normal text-red-500">
              {data.likeCount ?? "000"}
            </div>
          </section>

          {/* 등록일 */}
          <time className="w-fit h-[20px] font-normal leading-5 tracking-normal text-gray-600">
            {formatDate(data.createdAt) ?? "0000.00.00"}
          </time>
        </section>
      </article>
    </section>
  );
}
