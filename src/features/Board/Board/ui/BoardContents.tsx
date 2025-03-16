"use client";

import { Query } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import VideoPlayer from "@/shared/ui/player/video-player/Video-Player";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import LikeCount from "./likeCount";
import DisLikeCount from "./DisLikeCount";

const FetchBoardContents = dynamic(() => import("./contents"), { ssr: false });

interface IProps {
  data: Pick<Query, "fetchBoard">;
}

export default function BoardContents(props: IProps) {
  const [data, setData] = useState(props.data.fetchBoard);
  const router = useRouter();

  return (
    <article className="flex flex-col gap-6 w-full">
      {/* 제목 */}
      <h1 className="max-w-[1280px] font-bold text-[28px] text-black">
        {data.title}
      </h1>

      {/* 작성자, 등록일, 장소 */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-[54px]">
          {/* 작성자 */}
          <h4 className="flex items-center gap-2 not-italic">
            <Image
              src={
                data.user?.picture
                  ? `https://storage.googleapis.com/${data.user.picture}`
                  : "/not-images/not-profile.svg"
              }
              alt="profile-image"
              width={24}
              height={24}
            />
            <span className="font-light text-gray-700">{data.writer}</span>
          </h4>

          {/* 작성일 */}
          <time className="font-normal text-[#818181]">
            {formatDate(data.createdAt)}
          </time>
        </div>

        {/* 라인 */}
        <hr className="border-b border-[#e4e4e4]" />
      </section>

      {/* 이미지 */}
      {data.images?.length ? (
        <section className="flex flex-wrap gap-4">
          {data.images
            .filter((el) => el)
            .map((el) => (
              <Image
                key={el}
                src={`https://storage.googleapis.com/${el}`}
                alt="게시글 이미지"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[50%] h-auto"
              />
            ))}
        </section>
      ) : null}

      {/* 내용 */}
      <section className="w-full h-full min-h-[300px] font-normal text-2xl text-black">
        <FetchBoardContents data={props.data} />
      </section>

      {/* 동영상 */}
      {data.youtubeUrl !== null && data.youtubeUrl !== "" && (
        <section className="flex justify-center items-center gap-[10px] w-full h-full max-h-[512px] py-6 bg-[#e3e2e2]">
          <VideoPlayer url={String(data.youtubeUrl)} />
        </section>
      )}

      {/* 추천 */}
      <section className="flex justify-center items-center gap-6 w-full h-full max-h-[48px]">
        <DisLikeCount setData={setData} data={data} />
        <LikeCount setData={setData} data={data} />
      </section>

      {/* 목록, 수정 */}
      <section className="flex justify-center items-center gap-6 w-full h-[40px]">
        {/* 목록 */}
        <button onClick={() => router.back()} className="w-fit h-full">
          <Image
            src="/board/main-button.svg"
            alt="main-button"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto"
            priority={false}
          />
        </button>
        {/* 수정 */}
        <Link href={`/board/${data._id}/edit`}>
          <Image
            src={"/board/edit-button.svg"}
            alt="main-button"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto"
            priority={false}
          />
        </Link>
      </section>
    </article>
  );
}

// likeCount 해결하기
// 1. 낙관적 업데이트, 캐시 수정이 이루어 지지 않는 문제가 있음
//    이유는 ssr 데이터를 props로 넘겨 받고 있는 문제로 받아오는 컴포넌트에서 수정을 해줘야 함

// 2. csr로 해주면 해결할 수 있는 문제지만 게시물의 seo 노출을 위해 ssr 방식으로
//    데이터를 가져오고 props로 가져온 데이터를 state의 초기 값으로 사용해 setState로
//    좋아요 수정을 했음

// 3. 베스트 게시물에 좋아요 업데이트가 이루어 지지 않음 이는 ssr로 요청을 했어서
//    항상 최신데이터를 가져왔었으나 자주 변경되는 게시물이 아니라 캐싱을 하는 것이 더 좋다 판단
//    그래서 csr로 가져와
