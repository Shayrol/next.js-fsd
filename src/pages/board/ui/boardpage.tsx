import { Board } from "@/features/Board/Board";
import { Reply } from "@/features/Reply/Reply/Board";

type Params = { boardId: string };

export default async function BoardPage({ params }: { params: Params }) {
  const { boardId } = await params;

  return (
    <main className="flex flex-col justify-center items-center gap-4 w-full">
      <Board boardId={boardId} />
      <Reply boardId={boardId} />
    </main>
  );
}
