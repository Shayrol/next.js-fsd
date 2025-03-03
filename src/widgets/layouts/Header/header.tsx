import LoginButton from "@/shared/login/login-button";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-[80px] max-sm:h-[40px]">
      <div className="flex justify-between px-2 w-full max-w-[1280px] h-[40px]">
        {/* 모바일 */}
        <div className="sm:hidden flex justify-between items-center w-full">
          <Link href={"/"} className="font-semibold">
            트립토크
          </Link>
          <div>
            <span>로그인</span>
            <span>ㅁ</span>
          </div>
        </div>

        {/* 데스크 */}
        <div className="sm:flex hidden justify-between items-center w-full">
          <TabNavigation />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
