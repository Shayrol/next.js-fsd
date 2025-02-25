import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center gap-8 w-full h-[50px] border border-red-300 bg-red-400">
      <Link href={"/"}>Home</Link>
      <Link href={"/A"}>A</Link>
      <Link href={"/boards"}>Boards</Link>
    </header>
  );
}
