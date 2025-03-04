"use client";

import { Query } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";

interface IProps {
  data: Pick<Query, "fetchBoard">;
}

export default function BoardContents(props: IProps) {
  const data = props.data;

  console.log(data);
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* 제목 */}
      <h1 className="w-[1280px] h-fit font-bold text-[28px] text-black">
        {data.fetchBoard.title}
      </h1>
      {/* 작성자, 등록일, 장소 */}
      <article className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-[54px]">
          {/* 작성자 */}
          <div className="flex gap-1">
            <div className="bg-gray-300 rounded-[100%]">Img</div>
            <div className="font-light text-gray-700">
              {data.fetchBoard.writer}
            </div>
          </div>
          {/* 작성일 */}
          <div className="font-normal text-[#818181]">
            {formatDate(data.fetchBoard.createdAt)}
          </div>
        </div>
        {/* 라인 */}
        <div className="border border-b-[#e4e4e4]" />
        {/* 주소 */}
        {data.fetchBoard.boardAddress ? (
          <div className="flex justify-end w-full h-[36px]">
            <div
              title="주소"
              className="w-fit rounded-sm px-3 py-2 border border-gray-100 shadow-md shadow-black/15 cursor-default"
            >
              {data.fetchBoard.boardAddress?.addressDetail}
            </div>
          </div>
        ) : (
          <div className="flex justify-end w-full h-[36px]">
            <div
              title="주소"
              className="w-fit rounded-sm px-3 py-2 text-black/50 border border-gray-100 shadow-md shadow-black/15 cursor-default"
            >
              등록된 주소가 없습니다.
            </div>
          </div>
        )}
      </article>

      {/* 이미지 */}
      {data.fetchBoard.images === Array(0) ? (
        <article className="border border-red-500">
          {data.fetchBoard.images
            ?.filter((el) => el)
            .map((el) => (
              <Image
                key={el}
                src={`https://storage.googleapis.com/${el}`}
                alt="dd"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[50%] h-auto"
              />
            ))}
        </article>
      ) : (
        <></>
      )}
      {/* 내용 */}
      <article className="flex w-full font-normal text-2xl text-black">
        <div>{data.fetchBoard.contents}</div>
      </article>
      <div>672b5fedaf931d0029556049</div>
    </section>
  );
}
