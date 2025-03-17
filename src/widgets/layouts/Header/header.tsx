"use client";

import LoginButton from "@/shared/ui/login/login-button/Login-Button";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const HIDDEN_HEADER = ["/login", "/signup"];
  const header = HIDDEN_HEADER.includes(String(pathname));

  return (
    <>
      {!header && (
        <header className="flex justify-center items-center w-full h-[80px] max-sm:h-[40px]">
          <div className="flex justify-between px-2 w-full max-w-[1280px] h-[40px]">
            {/* 모바일 */}
            <div className="sm:hidden flex justify-between items-center w-full gap-2">
              <Link href={"/"} className="font-semibold">
                트립토크
              </Link>
              <Link
                href={"/login"}
                className="flex flex-row justify-center items-center gap-2"
              >
                <span className="font-medium text-[13px] text-gray-800">
                  로그인
                </span>
                <Image
                  src={"/login-signin-btn.svg"}
                  alt="signIn"
                  width={14}
                  height={14}
                />
              </Link>
            </div>

            {/* 데스크 */}
            <div className="sm:flex hidden justify-between items-center w-full">
              <TabNavigation />
              <LoginButton />
            </div>
          </div>
        </header>
      )}
    </>
  );
}
