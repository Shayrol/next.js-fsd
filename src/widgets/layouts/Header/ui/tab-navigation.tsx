"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    path: "/B",
    element: (
      <Link href={"/B"} className="block w-full h-[40px] p-2">
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
        <Link href={"/"} className="block p-2">
          <Image
            src="/layout/header/logo-header.svg"
            alt="logo-image"
            width={0}
            height={0}
            sizes="100vw"
            className="min-w-[56px] min-h-[32px]"
          />
        </Link>
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
