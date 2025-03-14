// 게시글 댓글, 댓글 수정에 사용된 댓글 입력 폼 컴포넌트

"use client";

import { ReplyTextArea } from "@/shared/ui/input/reply-textarea";
import RatingControlled from "@/shared/ui/Rating/rating-controlled";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetchCreateBoardCommentInput } from "../api/usefetchCreateBoardCommentInput";
import { Dispatch, SetStateAction, useState } from "react";
import { IFormInput } from "../type";
import { useFetchUpdateBoardCommentInput } from "../api/usefetchUpdateBoardCommentInput";

interface IFormInputProps {
  boardId: string;
  writer?: string | null;
  contents?: string;
  rating?: number;
  edit?: boolean;
  setEdit?: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  id?: string;
}

export default function ReplyInput(props: IFormInputProps) {
  const { boardId, writer, contents, rating, edit, setEdit, id } = props;

  const [value, setValue] = useState<number>(rating ?? 0); // 별점

  const [createBoardCommentInput] = useFetchCreateBoardCommentInput();
  const [updateBoardCommentInput] = useFetchUpdateBoardCommentInput();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      writer: writer ?? "",
      password: "",
      contents: contents ?? "",
      rating: rating ?? 0,
    },
  });

  // 게시물 댓글 등록
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
      // 리페치로 다시 API 요청이 아닌 캐시 수정으로 API 요청없이 댓글 목록 수정을 한다.
      // refetchQueries: ["fetchBoardComments"],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoardComments: (prev) => {
              return [data.createBoardComment, ...prev];
            },
          },
        });
      },
    });
    reset();
    setValue(0);
  };

  // 게시물 댓글 수정 - (boardId가 아닌 댓글 id로 수정하기)
  const onEdit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateBoardCommentInput({
        variables: {
          updateBoardCommentInput: {
            rating: value,
            contents: data.contents,
          },
          boardCommentId: id,
          password: data.password,
        },
      });

      // 화면 업데이트가 이루어지지 않아서 강제로 업데이트 해줌
      // await client.refetchQueries({ include: ["fetchBoardComments"] });

      if (setEdit) {
        setEdit((prev) => ({ ...prev, [id!]: false }));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("password", {
          type: "manual",
          message: "비밀번호가 일치하지 않습니다.",
        });
      }
    }
  };

  return (
    <article className="flex flex-col gap-6 w-full h-full">
      {!edit && (
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
      )}
      <form
        onSubmit={!edit ? handleSubmit(onSubmit) : handleSubmit(onEdit)}
        className="flex flex-col gap-6 w-full h-full"
      >
        {/* 별점, 작성자, 비밀번호 - (수정) */}
        <div className="flex flex-col gap-6 w-full">
          <RatingControlled
            ValueState={{
              value,
              setValue,
            }}
          />
          <div className="flex justify-start items-start gap-4 w-full max-sm:flex-col">
            <div className="relative flex flex-col w-full max-w-[312px] gap-2">
              <p className="flex gap-1 font-medium text-black">
                작성자<span className="text-red-500">*</span>
              </p>
              <input
                {...register("writer", { required: "작성자를 입력해 주세요." })}
                type="text"
                placeholder="작성자"
                className={`w-full px-4 py-3 rounded-[8px] bg border border-gray-300
                  ${!edit ? "bg-white" : "bg-gray-200"}`}
                disabled={edit}
              />
              {errors.writer && (
                <span className="absolute bottom-[-20px] right-0 text-[12px] text-red-500">
                  {errors.writer.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col w-full max-w-[312px] gap-2">
              <p className="flex gap-1 font-medium text-black">
                비밀번호<span className="text-red-500">*</span>
              </p>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해 주세요.",
                })}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className="w-full px-4 py-3 rounded-[8px] bg border border-gray-300"
              />
              {errors.password && (
                <span className="absolute bottom-[-20px] right-0 text-[12px] text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <section className="relative flex flex-col items-end gap-4 w-full h-full max-h-[208px]">
          <ReplyTextArea register={register} name="contents" />
          {errors.contents && (
            <span className="absolute bottom-[50px] right-0 text-[12px] text-red-500">
              {errors.contents.message}
            </span>
          )}
          {!edit ? (
            <button
              type="submit"
              className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-[#2974E5] text-white font-semibold rounded-[8px] border border-[#2974E5] hover:bg-[#2974E5]/90 max-sm:w-full"
            >
              등록하기
            </button>
          ) : (
            <section className="flex justify-end items-center w-full gap-4">
              <button
                type="button"
                onClick={() =>
                  setEdit && setEdit((prev) => ({ ...prev, [id!]: false }))
                }
                className="flex gap-2 px-4 py-3 font-normal text-black border border-black bg-white rounded-[8px]"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex gap-2 px-4 py-3 font-normal text-white border border-black bg-black rounded-[8px]"
              >
                수정하기
              </button>
            </section>
          )}
        </section>
      </form>
    </article>
  );
}
