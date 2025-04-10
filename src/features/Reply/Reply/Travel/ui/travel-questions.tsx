// 댓글 목록
"use client";

import Image from "next/image";
import TravelContents from "./travel-contents";
import { useFetchTravelProductQuestions } from "../api/useFetchTravelProductQuestions";
import { formatDate } from "@/lib/dateUtils";
import TravelAnswerList from "./travel-question-answers";
import { useState } from "react";
import TravelInput from "./travel-input";

export default function TravelQuestions({ travelId }: { travelId: string }) {
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const { data } = useFetchTravelProductQuestions({
    page: 1,
    travelproductId: travelId,
  });

  return (
    <>
      {data ? (
        data.fetchTravelproductQuestions.map((el) => (
          <section key={el._id} className="flex flex-col gap-3 w-full">
            <section className="flex flex-col gap-3 w-full">
              {/* 댓글 정보 */}
              <div className="flex flex-col gap-2 w-full">
                {/* 프로필 */}
                <div className="flex gap-1">
                  <Image
                    src={
                      el.user.picture
                        ? `https://storage.googleapis.com/${el.user.picture}`
                        : "/not-images/not-profile.svg"
                    }
                    alt="profile"
                    width={24}
                    height={24}
                  />
                  <p className="font-light text-[14px] text-gray-500">
                    {el.user._id === el.travelproduct.seller?._id
                      ? "판매자"
                      : el.user.name}
                  </p>
                </div>

                {/* 댓글 내용 */}
                <TravelContents contents={el.contents} />

                {/* 등록일 */}
                <p className="font-normal text-[14px] text-[#818181]">
                  {formatDate(el.createdAt)}
                </p>
              </div>

              {/* 대댓글 입력 버튼 */}
              <button
                type="button"
                onClick={() =>
                  setActiveInputId((prev: string | null) =>
                    prev === el._id ? null : el._id
                  )
                }
                className="flex gap-2"
              >
                <Image
                  src={"/reply/reply-question.svg"}
                  alt="reply-image"
                  width={24}
                  height={24}
                />
                <p className="font-light text-[14px] text-black">답변하기</p>
              </button>
            </section>

            {/* 대댓글 */}
            <TravelAnswerList questionId={el._id} />
            {activeInputId === el._id && (
              <TravelInput
                travelId={travelId}
                questionId={el._id}
                setActiveInputId={setActiveInputId}
              />
            )}
          </section>
        ))
      ) : (
        <div>댓글 없음</div>
      )}
    </>
  );
}

// 댓글 등록, 수정 구현하기
// 대댓글 제대로 불러오는지 확인
//
