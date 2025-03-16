import { Dispatch, SetStateAction } from "react";
import { Board } from "@/entities/api/graphql";
import Image from "next/image";
import { useDisLikeBoard } from "../api/useDisLikeBoard";

interface IProps {
  setData: Dispatch<SetStateAction<Board>>;
  data: Board;
}

export default function DisLikeCount(props: IProps) {
  const [dislikeBoard] = useDisLikeBoard();
  const setData = props.setData;
  const boardId = props.data._id;
  const data = props.data;

  const onDisLike = async () => {
    try {
      const { data: mutationData } = await dislikeBoard({
        variables: {
          boardId,
        },
      });

      // mutationData.likeBoard는 Int!로 반환된 좋아요 수
      setData((prev) => ({
        ...prev,
        dislikeCount: Number(mutationData?.dislikeBoard), // 최신 좋아요 수로 업데이트
      }));
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
      <p className="text-[#5f5f5f] font-normal">{data.dislikeCount}</p>
    </button>
  );
}
