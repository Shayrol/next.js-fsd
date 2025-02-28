import LoginButton from "@/shared/login/login-button";
import TabNavigation from "./ui/tab-navigation";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-[80px]">
      <div className="flex justify-between px-4 w-full max-w-[1280px] h-[40px]">
        <TabNavigation />
        <LoginButton />
      </div>
    </header>
  );
}
