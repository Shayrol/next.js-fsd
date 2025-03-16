import { Dispatch, SetStateAction } from "react";
import { useLikeBoard } from "../api/useLikeBoard";
import { Board } from "@/entities/api/graphql";
import Image from "next/image";

interface IProps {
  setData: Dispatch<SetStateAction<Board>>;
  data: Board;
}

export default function LikeCount(props: IProps) {
  const [likeBoard] = useLikeBoard();
  const setData = props.setData;
  const boardId = props.data._id;
  const data = props.data;

  const onLike = async () => {
    try {
      const { data: mutationData } = await likeBoard({
        variables: { boardId },
      });

      // mutationData.likeBoard는 Int!로 반환된 좋아요 수
      setData((prev) => ({
        ...prev,
        likeCount: Number(mutationData?.likeBoard), // 최신 좋아요 수로 업데이트
      }));
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
      <p className="text-[#f66a6a] font-normal">{data.likeCount}</p>
    </button>
  );
}
