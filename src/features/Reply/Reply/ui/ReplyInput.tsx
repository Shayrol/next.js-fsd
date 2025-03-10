// "use client";

// import { ReplyButton } from "@/shared/ui/button/reply-button";
// import { ReplyTextArea } from "@/shared/ui/input/reply-textarea";
// import RatingControlled from "@/shared/ui/Rating/rating-controlled";
// import Image from "next/image";
// import { useState } from "react";

// export default function ReplyInput({ boardId }: { boardId: string }) {
//   const [value, setValue] = useState<number | null>(0);
//   const [contents, setContents] = useState<string>("");
//   const [writer, setWriter] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   console.log("boardId", boardId);

//   return (
//     <article className="flex flex-col gap-6 w-full h-full">
//       <div className="flex justify-center items-center gap-2 w-full max-w-[60px] h-full max-h-[24px]">
//         <Image
//           src={"/board/reply/reply.svg"}
//           alt="reply-image"
//           width={0}
//           height={0}
//           sizes="100vw"
//           className="w-full h-full"
//         />
//         <p className="w-[28px] font-semibold text-black text-nowrap">댓글</p>
//       </div>
//       <div>
//         <RatingControlled ValueState={{ value, setValue }} />
//         <input
//           type="text"
//           placeholder="작성자"
//           value={writer}
//           onChange={(e) => setWriter(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <section className="flex flex-col items-end gap-4 w-full h-full max-h-[208px]">
//         <ReplyTextArea ContentsState={{ contents, setContents }} />
//         <ReplyButton query={{ boardId, value, contents, writer, password }} />
//       </section>
//     </article>
//   );
// }

"use client";

// import { ReplyButton } from "@/shared/ui/button/reply-button";
import { ReplyTextArea } from "@/shared/ui/input/reply-textarea";
import RatingControlled from "@/shared/ui/Rating/rating-controlled";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetchCreateBoardCommentInput } from "../api/usefetchCreateBoardCommentInput";
import { useState } from "react";
import { IFormInput } from "../type";

export default function ReplyInput({ boardId }: { boardId: string }) {
  const [value, setValue] = useState<number | null>(0);

  const [createBoardCommentInput] = useFetchCreateBoardCommentInput();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      writer: "",
      password: "",
      contents: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form Data:", data);
    await createBoardCommentInput({
      variables: {
        createBoardCommentInput: {
          writer: data.writer,
          password: data.password,
          rating: value,
          contents: data.contents,
        },
        boardId,
      },
      refetchQueries: ["fetchBoardComments"],
    });
    reset();
    setValue(0);
  };

  return (
    <article className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-center items-center gap-2 w-full max-w-[60px] h-full max-h-[24px]">
        <Image
          src={"/board/reply/reply.svg"}
          alt="reply-image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
        <p className="w-[28px] font-semibold text-black text-nowrap">댓글</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full h-full"
      >
        <div>
          <RatingControlled
            ValueState={{
              value,
              setValue,
            }}
          />
          <div className="flex flexborder border-red-500">
            <input
              {...register("writer", { required: "작성자를 입력해 주세요." })}
              type="text"
              placeholder="작성자"
              className="w-full outline-none board border-red-500"
            />
            {errors.writer && (
              <span className="text-red-500">{errors.writer.message}</span>
            )}
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
              })}
              type="password"
              placeholder="비밀번호"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
        <section className="flex flex-col items-end gap-4 w-full h-full max-h-[208px]">
          <ReplyTextArea register={register} name="contents" />
          {errors.contents && (
            <span className="text-red-500">{errors.contents.message}</span>
          )}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-[#2974E5] text-white font-semibold rounded-[8px] border border-[#2974E5] hover:bg-[#2974E5]/90 max-sm:w-full"
          >
            등록하기
          </button>
        </section>
      </form>
    </article>
  );
}

// 작성자, 비밀번호 입력 폼 수정 및 모듈화 하기
// 수정, 삭제 구현
// 게시글 좋아요 구현
// 게시글 수정하기 구현
// 게시글 등록의 우편번호 검색 모달 및 주소 라이브러리 구현

// 로그인 페이지 구현 및 기능 추가
// 레이아웃 헤더 로그인 및 프로필 추가
// 숙박권 구매 페이지 구현
