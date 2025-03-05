import { client } from "@/shared/api/apollo-client";
import { Query } from "@/entities/api/graphql";
import { BOARD_COMMENT } from "../api/usefetchBoardComments";
import ReplyContents from "./Reply";
import ReplyInput from "./ReplyInput";

export default async function Reply({ boardId }: { boardId: string }) {
  const { data, loading, error } = await client.query<
    Pick<Query, "fetchBoardComments">
  >({
    query: BOARD_COMMENT,
    variables: { page: 1, boardId },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log("fetchBoardComment: ", data.fetchBoardComments);
  console.log("fetchBoardComment: ", boardId);
  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full">
      <ReplyInput />
      <ReplyContents data={data} />
    </section>
  );
}
