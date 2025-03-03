import { Query } from "@/entities/api/graphql";
import { client } from "@/shared/api/apollo-client";
import { BOARDS } from "../api/useFetchBoards";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

export default async function BoardsContents() {
  const { data } = await client.query<Pick<Query, "fetchBoards">>({
    query: BOARDS,
    variables: { page: 1 },
  });

  return (
    <article className="flex flex-col justify-center items-center gap-6 px-12 py-6 w-full border shadow-lg shadow-[#1c1c1c1c] rounded-2xl">
      {/* <section className="gap-2"> */}
      <ul className="flex flex-col gap-2 w-full">
        <div className="flex w-full max-w-[1184px] px-6 py-4">
          <span className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c]">
            번호
          </span>
          <span className="flex justify-start items-center w-full max-w-[848px] gap-[10px] font-medium text-[#1c1c1c]">
            제목
          </span>
          <span className="flex justify-center items-center w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
            작성자
          </span>
          <span className="flex justify-center items-center w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
            날짜
          </span>
        </div>
        <section className="flex flex-col gap-3 w-full max-w-[1184px] h-fit">
          {data.fetchBoards.map((el) => (
            <li
              key={el._id}
              className="flex justify-start items-center gap-2 w-full max-w-[1184px] h-[44px] px-6 py-3 border border-[#f2f2f2] rounded-xl"
            >
              <p className="flex justify-center items-center w-[64px] gap-[10px] font-medium text-[#1c1c1c] opacity-60">
                {el._id.slice(-4)}
              </p>
              <Link
                href={`/${el._id}`}
                className="w-full max-w-[848px] hover:underline"
              >
                <span className="flex justify-start items-center w-full max-w-[848px] gap-[10px] font-medium text-[#1c1c1c]">
                  {el.title}
                </span>
              </Link>
              <h3 className="flex justify-center items-center w-[100px] gap-[10px] font-medium text-[#1c1c1c] opacity-80">
                {el.writer}
              </h3>
              <time className="flex justify-center items-center w-[100px] gap-[10px] font-medium text-[#1c1c1c]">
                {formatDate(el.createdAt)}
              </time>
            </li>
          ))}
        </section>
      </ul>
      {/* </section> */}
      <div>pagination</div>
    </article>
  );
}
