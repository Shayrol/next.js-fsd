"use client";

import { useFetchCreateBoardCommentInput } from "@/features/Reply/Reply/api/usefetchCreateBoardCommentInput";

interface IReplyButtonProps {
  query: {
    boardId: string;
    value: number | null;
    contents: string;
    writer: string;
    password: string;
  };
}

export default function ReplyButton(props: IReplyButtonProps) {
  const { boardId, value, contents, writer, password } = props.query;

  const [crateBoardCommentInput] = useFetchCreateBoardCommentInput();

  const onClickSubmit = () => {
    crateBoardCommentInput({
      variables: {
        createBoardCommentInput: {
          writer,
          password,
          rating: value,
          contents,
        },
        boardId,
      },
      refetchQueries: ["fetchBoardComments"],
    });
  };

  return (
    <button
      onClick={onClickSubmit}
      className="flex justify-center items-center gap-2 w-full max-w-[99px] h-full max-h-[48px] rounded-[8px] px-4 py-3 bg-black text-nowrap text-white font-semibold"
    >
      댓글 등록
    </button>
  );
}
