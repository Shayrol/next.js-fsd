"use client";

import { formatDate } from "@/lib/dateUtils";
import VideoPlayer from "@/shared/ui/player/video-player/Video-Player";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LikeCount from "./likeCount";
import DisLikeCount from "./DisLikeCount";
import { useFetchBoard } from "../api/useFetchBoard";

const FetchBoardContents = dynamic(() => import("./contents"), { ssr: false });

export default function BoardContents({ boardId }: { boardId: string }) {
  const { data: BoardData } = useFetchBoard(boardId);
  const data = BoardData;
  const router = useRouter();

  return (
    <article className="flex flex-col gap-6 w-full">
      {/* 제목 */}
      <h1 className="max-w-[1280px] font-bold text-[28px] text-black">
        {data?.fetchBoard.title}
      </h1>

      {/* 작성자, 등록일, 장소 */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-[54px]">
          {/* 작성자 */}
          <h4 className="flex items-center gap-2 not-italic">
            <Image
              src={
                data?.fetchBoard.user?.picture
                  ? `https://storage.googleapis.com/${data?.fetchBoard.user?.picture}`
                  : "/not-images/not-profile.svg"
              }
              alt="profile-image"
              width={24}
              height={24}
            />
            <span className="font-light text-gray-700">
              {data?.fetchBoard.writer}
            </span>
          </h4>

          {/* 작성일 */}
          <time className="font-normal text-[#818181]">
            {formatDate(data?.fetchBoard.createdAt)}
          </time>
        </div>

        {/* 라인 */}
        <hr className="border-b border-[#e4e4e4]" />
      </section>

      {/* 이미지 */}
      {data?.fetchBoard.images?.length ? (
        <section className="flex flex-wrap gap-4">
          {data?.fetchBoard.images
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
        <FetchBoardContents data={data} />
      </section>

      {/* 동영상 */}
      {data?.fetchBoard.youtubeUrl !== null &&
        data?.fetchBoard.youtubeUrl !== "" && (
          <section className="flex justify-center items-center gap-[10px] w-full h-full max-h-[512px] py-6 bg-[#e3e2e2]">
            <VideoPlayer url={String(data?.fetchBoard.youtubeUrl)} />
          </section>
        )}

      {/* 추천 */}
      <section className="flex justify-center items-center gap-6 w-full h-full max-h-[48px]">
        <DisLikeCount data={data} />
        <LikeCount data={data} />
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
        <Link href={`/board/${data?.fetchBoard._id}/edit`}>
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
