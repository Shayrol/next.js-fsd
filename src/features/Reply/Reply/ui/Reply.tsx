"use client";

import { Query } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import RatingRead from "@/shared/ui/Rating/raiting-read";
import Image from "next/image";

interface IProps {
  data: Pick<Query, "fetchBoardComments">;
}

export default function ReplyContents(props: IProps) {
  const data = props.data;

  return (
    <article className="flex flex-col w-full">
      {data.fetchBoardComments.length ? (
        data.fetchBoardComments.map((el, index) => (
          <section key={el._id} className="flex flex-col gap-2">
            {/* 댓글 헤더 (프로필 이미지, 작성자, 평점, 수정/삭제) */}
            <header className="flex flex-row justify-between items-center w-full h-[24px]">
              <div className="flex items-center gap-2">
                <div className="flex w-full h-full max-h-[24px] gap-1">
                  <Image
                    src={
                      el.user?.picture !== undefined
                        ? `https://storage.googleapis.com/${el.user?.picture}`
                        : "/not-images/not-profile.svg"
                    }
                    alt="profile-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="font-light text-[#5f5f5f]">{el.writer}</span>
                </div>
                <RatingRead rating={el.rating} />
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <button type="button" className="hover:underline">
                  수정
                </button>
                <button type="button" className="hover:underline">
                  삭제
                </button>
              </div>
            </header>

            {/* 댓글 내용 */}
            <p className="w-full font-normal text-gray-800">{el.contents}</p>

            {/* 댓글 날짜 */}
            <footer className="h-full max-h-[24px] font-normal text-[#818181]">
              <time>{formatDate(el.createdAt)}</time>
            </footer>

            {/* 구분선 */}
            {index !== data.fetchBoardComments.length - 1 && (
              <hr className="w-full border-[1px] my-10 border-b-gray-100" />
            )}
          </section>
        ))
      ) : (
        <p>등록된 댓글 없음</p>
      )}
    </article>
  );
}
