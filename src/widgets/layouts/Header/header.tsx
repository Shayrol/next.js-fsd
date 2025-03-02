import LoginButton from "@/shared/login/login-button";
import TabNavigation from "./ui/tab-navigation";
import Logo from "./ui/logo";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-[80px]">
      <div className="flex justify-between px-2 w-full max-w-[1280px] h-[40px]">
        {/* 모바일 */}
        <div className="sm:hidden flex justify-between items-center w-full">
          <Logo />
          <p>ㅁ</p>
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
