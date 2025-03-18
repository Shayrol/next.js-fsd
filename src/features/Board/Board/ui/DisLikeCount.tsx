"use client";

import { Query } from "@/entities/api/graphql";
import Image from "next/image";
import { useDisLikeBoard } from "../api/useDisLikeBoard";

export default function DisLikeCount({
  data,
}: {
  data: Pick<Query, "fetchBoard"> | undefined;
}) {
  const [dislikeBoard] = useDisLikeBoard();
  const boardId = data?.fetchBoard._id;

  const onDisLike = async () => {
    try {
      await dislikeBoard({
        variables: {
          boardId,
        },
        optimisticResponse: {
          dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1,
        },
        update(cache, { data }) {
          if (typeof data?.dislikeBoard === "number") {
            cache.modify({
              id: cache.identify({
                __typename: "Board",
                _id: String(boardId),
              }),
              fields: {
                dislikeCount() {
                  return data.dislikeBoard;
                },
              },
            });
          }
        },
      });
    } catch (error) {
      console.error("안좋아요 처리 오류:", error);
    }
  };

  return (
    <button
      onClick={onDisLike}
      className="flex flex-col justify-center items-center gap-1 w-full max-w-[24px] h-full max-h-[48px]"
    >
      <Image
        src={"/vote/main-unlike.svg"}
        alt="un-like"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full"
      />
      <p className="text-[#5f5f5f] font-normal">
        {data?.fetchBoard.dislikeCount}
      </p>
    </button>
  );
}
