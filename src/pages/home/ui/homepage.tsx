import { Boards } from "@/features/Boards/Boards";
import BoardsOfTheBest from "@/features/Boards/BoardsOfTheBest/ui/BoardsOfTheBest";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full px-5">
      <BoardsOfTheBest />
      <Boards />
    </main>
  );
}
