import { Board } from "@/features/Board/Board";
import { Reply } from "@/features/Reply/Reply";

type Params = { boardId: string };
// type SearchParams = { [key: string]: string | string[] | undefined };

export default async function BoardPage({
  params,
}: // searchParams,
{
  params: Params;
  // searchParams: SearchParams;
}) {
  // const boardId = String(params.boardId);
  const { boardId } = await params;

  return (
    <main className="flex flex-col justify-center items-center gap-4 w-full">
      <Board boardId={boardId} />
      <Reply boardId={boardId} />
    </main>
  );
}
