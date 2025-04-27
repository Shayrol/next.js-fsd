// 모바일 네비게이션

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderTag = [
  {
    path: "/",
    element: "트립토크",
    image: (
      <Image
        src={"/footer-navigation/triptalk.svg"}
        alt="tripTalk"
        width={22}
        height={22}
      />
    ),
  },
  {
    path: "/travel",
    element: "숙박권 구매",
    image: (
      <Image
        src={"/footer-navigation/store.svg"}
        alt="tripTalk"
        width={22}
        height={22}
      />
    ),
  },
  {
    path: "/mypage",
    element: "마이 페이지",
    image: (
      <Image
        src={"/footer-navigation/mypage.svg"}
        alt="tripTalk"
        width={22}
        height={22}
      />
    ),
  },
];

export default function Footer() {
  const [hideFooter, setHideFooter] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideFooter(currentScrollY > lastScrollY); // 아래로 스크롤 중이면 숨김
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideFooter) return null;

  return (
    <footer className="fixed bottom-0 z-10 flex justify-around items-center w-full h-[76px] border-t border-gray-200 bg-white sm:hidden">
      {HeaderTag.map((el) => (
        <Link href={el.path} key={el.path} className="w-[80px]">
          <li
            className={`flex flex-col justify-center items-center gap-1 w-full font-normal text-xs whitespace-nowrap
            ${
              (el.path === "/" &&
                (pathName === "/" || pathName?.startsWith("/board"))) ||
              (el.path === "/travel" && pathName?.startsWith("/travel")) ||
              (el.path === "/mypage" && pathName?.startsWith("/mypage"))
                ? "filter brightness-0"
                : "filter brightness-10 text-gray-400"
            } 
              hover:brightness-0 transition-all duration-300`}
          >
            {el.image}
            <p>{el.element}</p>
          </li>
        </Link>
      ))}
    </footer>
  );
}
