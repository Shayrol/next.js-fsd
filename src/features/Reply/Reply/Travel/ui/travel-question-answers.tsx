// 대댓글

"use client";

import Image from "next/image";
import { useFetchTravelProductQuestionAnswers } from "../api/useFetchTravelProductQuestionAnswers";
import TravelContents from "./travel-contents";
import { formatDate } from "@/lib/dateUtils";

export default function TravelAnswerList({
  questionId,
}: {
  questionId: string;
}) {
  const { data: answerData } = useFetchTravelProductQuestionAnswers({
    page: 1,
    travelproductQuestionId: questionId,
  });

  if (
    !answerData ||
    answerData.fetchTravelproductQuestionAnswers.length === 0
  ) {
    return null; // 대댓글 없으면 안 보이게
  }

  return (
    <div className="pl-6 mt-2 flex flex-col gap-3 w-full">
      {answerData.fetchTravelproductQuestionAnswers.map((answer) => (
        <div
          key={answer._id}
          className="flex justify-center items-start gap-2 w-full"
        >
          <Image
            src={"/reply/return.svg"}
            alt="return"
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-1">
              <Image
                src={
                  answer.user.picture
                    ? `https://storage.googleapis.com/${answer.user.picture}`
                    : "/not-images/not-profile.svg"
                }
                alt="profile"
                width={20}
                height={20}
              />
              <p className="text-[13px] text-gray-500">{answer.user.name}</p>
            </div>
            <TravelContents contents={answer.contents} />
            <p className="text-[12px] text-[#818181]">
              {formatDate(answer.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
