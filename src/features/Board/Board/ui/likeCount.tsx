"use client";

import { useLikeBoard } from "../api/useLikeBoard";
import { Query } from "@/entities/api/graphql";
import Image from "next/image";

export default function LikeCount({
  data,
}: {
  data: Pick<Query, "fetchBoard"> | undefined;
}) {
  const [likeBoard] = useLikeBoard();
  const boardId = data?.fetchBoard._id;

  const onLike = async () => {
    try {
      void likeBoard({
        variables: { boardId },
        optimisticResponse: {
          likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1, // 숫자 값만 반환
        },

        update(cache, { data }) {
          if (typeof data?.likeBoard === "number") {
            cache.modify({
              id: cache.identify({
                __typename: "Board",
                _id: String(boardId),
              }),
              fields: {
                likeCount() {
                  return data.likeBoard;
                },
              },
            });
          }
        },
      });
    } catch (error) {
      console.error("좋아요 처리 오류:", error);
    }
  };

  return (
    <button
      onClick={onLike}
      className="flex flex-col justify-center items-center gap-1 w-full max-w-[24px] h-full max-h-[48px]"
    >
      <Image
        src={"/vote/main-like.svg"}
        alt="like"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full"
      />
      <p className="text-[#f66a6a] font-normal">{data?.fetchBoard.likeCount}</p>
    </button>
  );
}
