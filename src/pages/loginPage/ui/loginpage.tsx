"use client";

import Logo from "@/widgets/layouts/Header/ui/logo";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-row justify-center items-center w-full h-[1080px] max-sm:h-full">
      {/* 로그인 영역 */}
      <section className="flex flex-col justify-start items-center max-w-[400px] h-full pt-[224px] pb-10 bg-white">
        {/* 헤더 영역: 로고 및 환영 메시지 */}
        <header className="flex flex-col justify-center items-center gap-6">
          <Logo width={120} height={80} />
          <h1 className="font-semibold text-black text-nowrap">
            트립트립에 오신걸 환영합니다.
          </h1>
        </header>

        {/* 로그인 폼 */}
        <form className="flex flex-col justify-center items-center gap-6 px-5 max-w-full w-[320px]">
          <fieldset className="flex flex-col justify-center items-center w-full gap-6 border-none">
            <legend className="sr-only">로그인 정보 입력</legend>

            {/* 로그인 안내 문구 */}
            <p className="font-medium text-[#333333] text-[14px]">
              트립트립에 로그인 하세요.
            </p>

            {/* 이메일 및 비밀번호 입력 */}
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="email" className="sr-only">
                이메일 입력
              </label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력해 주세요."
                className="flex px-4 py-2 w-full outline-gray-300 border border-gray-200"
              />

              <label htmlFor="password" className="sr-only">
                비밀번호 입력
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해 주세요."
                className="flex px-4 py-2 w-full outline-gray-300 border border-gray-200"
              />
            </div>
          </fieldset>

          {/* 로그인 버튼 및 회원가입 링크 */}
          <footer className="flex flex-col justify-center items-center gap-6 w-full">
            <button
              type="submit"
              className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-[#2974e5] text-white rounded-[8px] font-semibold hover:bg-[#2974e5]/90"
            >
              로그인
            </button>
            <Link
              href={"/signup"}
              className="font-normal text-black text-[12px] hover:underline"
            >
              회원가입
            </Link>
          </footer>
        </form>
      </section>

      {/* 로그인 이미지 (모바일에서는 숨김) */}
      <aside className="w-full h-[1080px] max-sm:hidden">
        <Image
          src={"/signIn-Up.svg"}
          alt="로그인, 회원가입 페이지 이미지"
          width={0}
          height={0}
          sizes="100vh"
          className="flex w-full h-full object-cover"
        />
      </aside>
    </main>
  );
}
