"use client";

import { formatDate } from "@/lib/dateUtils";
import RatingRead from "@/shared/ui/Rating/raiting-read";
import Image from "next/image";
import { useFetchBoardComments } from "../api/usefetchBoardComments";
import { useState } from "react";
import ReplyInput from "./ReplyInput";
import { useFetchDeleteBoardComment } from "../api/usefetchDeleteboardCommentInput";
import { BoardComment } from "@/entities/api/graphql";

export default function ReplyContents({ boardId }: { boardId: string }) {
  const { data, loading } = useFetchBoardComments(boardId);
  const [deleteBoardComment] = useFetchDeleteBoardComment();

  const [edit, setEdit] = useState<{ [key: string]: boolean }>({});

  console.log(data?.fetchBoardComments);

  if (loading) return <p className="text-center text-gray-500">loading...</p>;

  const handleEdit = (id: string) => {
    setEdit({ [id]: true });
  };

  const onDelete = async (id: string) => {
    const password = prompt("비밀번호를 입력해 주세요,");

    try {
      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: id,
        },
        // refetchQueries: ["fetchBoardComments"],
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoardComments: (prev, { readField }) => {
                const deleteId = data.deleteBoardComment;
                const filteredPrev = prev.filter(
                  (el: BoardComment) => readField("_id", el) !== deleteId
                );
                return [...filteredPrev];
              },
            },
          });
        },
      });
      alert("삭제 완료");
    } catch (error) {
      if (error instanceof Error) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  console.log("edit: ", edit);
  return (
    <article className="flex flex-col w-full">
      {data?.fetchBoardComments.length ? (
        // {replyData?.length ? (
        data?.fetchBoardComments.map((el, index) => (
          // replyData.map((el, index) => (
          <section key={el._id} className="flex flex-col gap-2">
            {edit[el._id] ? (
              // ✅ 수정 모드일 때 ReplyInput 표시
              <ReplyInput
                boardId={boardId}
                writer={el.writer}
                contents={el.contents}
                rating={el.rating}
                edit={edit[el._id]}
                setEdit={setEdit}
                id={el._id}
              />
            ) : (
              // ✅ 일반 모드일 때 기존 댓글 표시
              <>
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
                      <span className="font-light text-[#5f5f5f]">
                        {el.writer}
                      </span>
                    </div>
                    <RatingRead rating={el.rating} />
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => handleEdit(el._id)}
                      className="hover:underline"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(el._id)}
                      className="hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                </header>

                {/* 댓글 내용 */}
                <p className="w-full font-normal text-gray-800">
                  {el.contents}
                </p>

                {/* 댓글 날짜 */}
                <footer className="h-full max-h-[24px] font-normal text-[#818181]">
                  <time>{formatDate(el.createdAt)}</time>
                </footer>
              </>
            )}

            {/* 마지막 댓글이 아닐 경우 구분선 추가 */}
            {index !== data.fetchBoardComments.length - 1 && (
              <hr className="border-gray-200 my-4" />
            )}
          </section>
        ))
      ) : (
        <p className="text-center text-gray-500">등록된 댓글 없음</p>
      )}
    </article>
  );
}
