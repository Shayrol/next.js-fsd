"use client";

import LoginButton from "@/shared/ui/login/login-button/Login-Button";
import TabNavigation from "./ui/tab-navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useFetchUserLoggedIn } from "@/entities/api/auth/useFetchUserLoggedIn";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import ProfileModal from "./ui/profile-modal";
import MobileProfileModal from "./ui/mobile-profile-modal";

const pathList = [
  { name: "트립토크", path: "/" },
  { name: "숙박권 예약", path: "/travel" },
  { name: "마이 페이지", path: "/mypage" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  // const HIDDEN_HEADER = ["/login", "/signup"];
  // const header = HIDDEN_HEADER.includes(String(pathname));
  const HIDDEN_HEADER = ["/login", "/signup"];
  const header = HIDDEN_HEADER.includes(String(pathname));
  const HIDDEN_HEADER_MOBILE = [
    "/login",
    "/signup",
    "/board/new",
    "/travel/new",
  ];
  const headerMobile = HIDDEN_HEADER_MOBILE.includes(String(pathname));
  // const header =
  //   HIDDEN_HEADER.includes(String(pathname)) ||
  //   (String(pathname).startsWith("/travel/") && pathname !== "/travel");

  const { user, setUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const currentPage = pathList.find((el) => el.path === pathname);
  console.log("currentPage: ", currentPage);

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
      {/* <header className="flex justify-center items-center w-full h-[80px] max-sm:h-[40px] border border-red-500"> */}
      <header className="relative flex justify-center items-center w-full max-sm:px-5 max-sm:gap-[10px]">
        <div className="flex justify-between px-2 w-full max-w-[1280px] ">
          {/* 모바일 */}
          {!headerMobile && (
            <div className="sm:hidden flex justify-between items-center w-full py-3 h-[48px] gap-2">
              <p className="font-semibold text-base text-black">
                {currentPage?.name ?? (
                  <button
                    onClick={() => router.back()}
                    className="flex gap-2 w-full max-w-6 h-6"
                  >
                    <Image
                      src={"/pagination/prev.svg"}
                      alt="back"
                      width={21}
                      height={21}
                    />
                  </button>
                )}
              </p>
              {!loading ? (
                data?.fetchUserLoggedIn ? (
                  <>
                    <div onClick={() => setOpen(true)} className="flex gap-2">
                      <Image
                        src={
                          user?.picture
                            ? `https://storage.googleapis.com/${user.picture}`
                            : `/not-images/not-profile.svg`
                        }
                        alt="profile"
                        width={26}
                        height={26}
                      />
                    </div>
                    <MobileProfileModal
                      open={open}
                      setOpen={setOpen}
                      user={data.fetchUserLoggedIn}
                    />
                  </>
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
                <div className="h-[24px] w-[100px] bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>
          )}

          {/* 데스크 */}
          {!header && (
            <div className="sm:flex hidden justify-between items-center w-full h-[80px]">
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
          )}
        </div>
      </header>
    </>
  );
}
