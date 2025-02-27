import { ModeToggle } from "@/shared/ui/Theme-Button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex relative justify-center items-center gap-10 h-[50px] bg-red-300 dark:bg-gray-700 text-black dark:text-white">
      <ul className="flex justify-center items-center gap-[20px] h-[100%] border border-blue-600 w-full">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/A"}>A</Link>
        </li>
        <li>
          <Link href={"/boards"}>Boards</Link>
        </li>
      </ul>
      <div className="absolute right-0 mr-5">
        <ModeToggle />
      </div>
    </header>
  );
}
