"use client";

// import { Query } from "@/entities/api/graphql";
import { formatDate } from "@/lib/dateUtils";
import RatingRead from "@/shared/ui/Rating/raiting-read";
import Image from "next/image";
import { useFetchBoardComments } from "../api/usefetchBoardComments";
import { useState } from "react";
import ReplyInput from "./ReplyInput";

// interface IProps {
//   data: Pick<Query, "fetchBoardComments">;
// }

// export default function ReplyContents({ boardId }: { boardId: string }) {
//   // const data = props.data;
//   const [edit, setEdit] = useState<{ [key: string]: boolean }>({});
//   const [password, setPassword] = useState("");

//   const { data, loading } = useFetchBoardComments(boardId);

//   const handleEdit = (id: string) => {
//     setEdit((prev) => ({
//       ...prev,
//       [id]: !prev[id], // 해당 댓글만 상태 토글
//     }));
//   };

//   console.log(data?.fetchBoardComments);

//   if (loading)
//     return (
//       <p className="flex justify-center items-center w-full min-h-[64px] p-10 font-bold text-gray-500 border border-gary-200 rounded-[8px]">
//         loading...
//       </p>
//     );

//   return (
//     <article className="flex flex-col w-full">
//       {data?.fetchBoardComments.length ? (
//         data?.fetchBoardComments.map((el, index) => (
//           <section key={el._id} className="flex flex-col gap-2">
//             {/* 댓글 헤더 (프로필 이미지, 작성자, 평점, 수정/삭제) */}
//             <header className="flex flex-row justify-between items-center w-full h-[24px]">
//               <div className="flex items-center gap-2">
//                 <div className="flex w-full h-full max-h-[24px] gap-1">
//                   <Image
//                     src={
//                       el.user?.picture !== undefined
//                         ? `https://storage.googleapis.com/${el.user?.picture}`
//                         : "/not-images/not-profile.svg"
//                     }
//                     alt="profile-image"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="w-[24px] h-[24px]"
//                   />
//                   <span className="font-light text-[#5f5f5f]">{el.writer}</span>
//                 </div>
//                 <RatingRead rating={el.rating} />
//               </div>
//               <div className="flex gap-2 text-sm text-gray-600">
//                 <button
//                   type="button"
//                   onClick={() => handleEdit(el._id)}
//                   className="hover:underline"
//                 >
//                   수정
//                 </button>
//                 <button type="button" className="hover:underline">
//                   삭제
//                 </button>
//               </div>
//             </header>

//             {/* 댓글 내용 */}
//             <p className="w-full font-normal text-gray-800">{el.contents}</p>

//             {/* 댓글 날짜 */}
//             <footer className="h-full max-h-[24px] font-normal text-[#818181]">
//               <time>{formatDate(el.createdAt)}</time>
//             </footer>

//             {/* 구분선 */}
//             {index !== data.fetchBoardComments.length - 1 && (
//               <hr className="w-full border-[1px] my-10 border-b-gray-100" />
//             )}
//           </section>
//         ))
//       ) : (
//         <p className="flex justify-center items-center w-full min-h-[64px] p-10 font-bold text-gray-500 border border-gary-200 rounded-[8px]">
//           등록된 댓글 없음
//         </p>
//       )}
//     </article>
//   );
// }

export default function ReplyContents({ boardId }: { boardId: string }) {
  const [edit, setEdit] = useState<{ [key: string]: boolean }>({});
  const [password, setPassword] = useState("");
  const { data, loading } = useFetchBoardComments(boardId);

  console.log(data?.fetchBoardComments);

  if (loading) return <p className="text-center text-gray-500">loading...</p>;

  const handleEdit = (id: string) => {
    setEdit({ [id]: true });
  };

  console.log("edit: ", edit);
  return (
    <article className="flex flex-col w-full">
      {data?.fetchBoardComments.length ? (
        data?.fetchBoardComments.map((el, index) => (
          <section key={el._id} className="flex flex-col gap-2">
            {edit[el._id] ? (
              // ✅ 수정 모드일 때 ReplyInput 표시
              <ReplyInput
                boardId={boardId}
                writer={el.writer}
                setPassword={setPassword}
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
                    <button type="button" className="hover:underline">
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
