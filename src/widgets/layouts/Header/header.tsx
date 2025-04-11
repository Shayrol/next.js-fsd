"use client";

import LoginButton from "@/shared/ui/login/login-button/Login-Button";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useFetchUserLoggedIn } from "@/entities/api/auth/useFetchUserLoggedIn";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  // const HIDDEN_HEADER = ["/login", "/signup"];
  // const header = HIDDEN_HEADER.includes(String(pathname));
  const HIDDEN_HEADER = ["/login", "/signup"];
  const header =
    HIDDEN_HEADER.includes(String(pathname)) ||
    (String(pathname).startsWith("/travel/") && pathname !== "/travel");

  // || (String(pathname).startsWith("/travel/") && pathname !== "/travel");

  const { user, setUser } = useUserStore();

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
      setUser({
        _id: data.fetchUserLoggedIn._id,
        name: data.fetchUserLoggedIn.name,
        email: data.fetchUserLoggedIn.email,
        picture: data.fetchUserLoggedIn.picture ?? null,
        createdAt: data.fetchUserLoggedIn.createdAt,
      });
    }
  }, [data, setUser, user]);

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
                  <div>{data.fetchUserLoggedIn.name}</div>
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

// 세로고침 후 skeleton loading ui 생성하기
// 로그인 페이지에서 로그인 후 layout/header의 로그인 유저 정보 리렌더링 필요
// refetch를 로그인 버튼에 했지만 해당 headers의 Authorization에 accessToken이
// 아직 없어 에러가 생김 그래서 header 컴포넌트에 useEffect로 refetch를 했지만
// 안됨...
