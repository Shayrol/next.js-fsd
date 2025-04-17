"use client";

import LoginButton from "@/shared/ui/login/login-button/Login-Button";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useFetchUserLoggedIn } from "@/entities/api/auth/useFetchUserLoggedIn";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import ProfileModal from "./ui/profile-modal";

export default function Header() {
  const pathname = usePathname();
  // const HIDDEN_HEADER = ["/login", "/signup"];
  // const header = HIDDEN_HEADER.includes(String(pathname));
  const HIDDEN_HEADER = ["/login", "/signup"];
  const header =
    HIDDEN_HEADER.includes(String(pathname)) ||
    (String(pathname).startsWith("/travel/") && pathname !== "/travel");

  const { user, setUser } = useUserStore();
  const [open, setOpen] = useState(false);

  // 1. 페이지 접속 시 자동으로 API 요청
  const { data, loading } = useFetchUserLoggedIn();

  // 2. 함수가 실행하면 API 요청
  // const [, { data: loginExample }] = useLazyQuery(LOGIN_USER);
  // 3. fetch처럼 사용
  // const client = useApolloClient()
  // client.query({
  //   query: LOGIN_USER,
  // })

  // 로그인 정보를 통해 travel작성자 확인 및 마이 페이지 정보 표시 위함
  useEffect(() => {
    if (data?.fetchUserLoggedIn && user?._id !== data.fetchUserLoggedIn._id) {
      setUser(data.fetchUserLoggedIn);
    }
  }, [data, setUser, user]);

  console.log("user", data?.fetchUserLoggedIn);

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
              {!loading ? (
                data?.fetchUserLoggedIn ? (
                  <div>{data?.fetchUserLoggedIn.name}</div>
                ) : (
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
                )
              ) : (
                <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>

            {/* 데스크 */}
            <div className="sm:flex hidden justify-between items-center w-full">
              <TabNavigation />
              {!loading ? (
                data?.fetchUserLoggedIn ? (
                  // <ProfileModal user={data.fetchUserLoggedIn} />
                  <>
                    <div
                      onClick={() => setOpen(true)}
                      className="relative flex gap-2 cursor-pointer"
                    >
                      <Image
                        src={
                          data.fetchUserLoggedIn.picture
                            ? `https://storage.googleapis.com/${data.fetchUserLoggedIn.picture}`
                            : `/not-images/not-profile.svg`
                        }
                        alt="profile"
                        width={40}
                        height={40}
                      />
                      <Image
                        src={"/layout/header/down_arrow.svg"}
                        alt="down-arrow"
                        width={24}
                        height={24}
                      />
                      {/* 프로파일 모달 */}
                      {open && (
                        <ProfileModal
                          user={data.fetchUserLoggedIn}
                          setOpen={setOpen}
                        />
                      )}
                    </div>

                    {/* 배경 클릭 모달 닫기 */}
                    {open && (
                      <div
                        onClick={() => setOpen(false)}
                        className="fixed left-0 top-0 z-10 w-full h-screen"
                      />
                    )}
                  </>
                ) : (
                  <LoginButton />
                )
              ) : (
                <div className="w-[100px]">
                  <div className="h-[24px] w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}
