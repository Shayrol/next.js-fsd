"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const HeaderTag = [
  {
    path: "/",
    element: (
      <Link href={"/"} className="block w-full h-[40px] p-2">
        트립토크
      </Link>
    ),
  },
  {
    path: "/travel",
    element: (
      <Link href={"/travel"} className="block w-full h-[40px] p-2">
        숙박권 구매
      </Link>
    ),
  },
  {
    path: "/C",
    element: (
      <Link href={"/C"} className="block w-full h-[40px] p-2">
        마이 페이지
      </Link>
    ),
  },
];

export default function TabNavigation() {
  const pathName = usePathname();

  return (
    <ul className="flex justify-between items-center gap-4">
      <li className="mr-[28px]">
        <Logo width={56} height={32} />
      </li>
      {HeaderTag.map((el) => (
        <li
          key={el.path}
          className={`flex justify-center items-center font-bold text-base whitespace-nowrap
            ${
              pathName === el.path
                ? "border-b-2 border-black"
                : "border-b-2 border-transparent"
            } 
            hover:border-b-2 hover:border-black transition-all duration-300`}
        >
          {el.element}
        </li>
      ))}
    </ul>
  );
}
