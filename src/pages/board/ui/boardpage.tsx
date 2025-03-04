import { Board } from "@/features/Board/Board";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const boardId = (await params).boardId;

  return (
    <main className="flex flex-col justify-center items-center gap-4 w-full border border-red-500">
      <Board boardId={boardId} />
      <div>reply</div>
    </main>
  );
}
