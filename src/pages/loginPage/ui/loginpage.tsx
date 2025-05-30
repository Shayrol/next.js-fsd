"use client";

import Logo from "@/widgets/layouts/Header/ui/logo";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../api/schema";
import { useLoginUser } from "../api/useLoginUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccessTokenStore } from "@/stores/tokenStore";
import Cookies from "js-cookie";
// import { useApolloClient } from "@apollo/client";

interface IForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const { setAccessToken } = useAccessTokenStore();
  const [loginUser] = useLoginUser();
  // const client = useApolloClient();
  // const ownHoursCookieAccessToken = 1 * 60 * 60 * 1000;
  const date = new Date();
  date.setTime(date.getTime() + 2 * 60 * 60 * 1000); // 2시간

  const { handleSubmit, register, reset, formState, setError } = useForm<IForm>(
    {
      resolver: yupResolver(LoginSchema),
    }
  );

  const onLogin = async (data: IForm) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      setAccessToken(accessToken ?? "");
      Cookies.set("accessToken", accessToken ?? "", {
        secure: false,
        sameSite: "Strict",
        expires: date,
      });
      router.push(callbackUrl);
    } catch (error) {
      if (error instanceof Error) {
        reset({ password: "" });

        if (error.message.includes("회원정보 인증에 실패하였습니다.")) {
          setError("root", {
            message: "아이디 또는 비밀번호를 확인해 주세요.",
          });
        } else if (error.message.includes("회원정보을 찾을 수 없습니다.")) {
          setError("root", { message: "가입되지 않은 이메일입니다." });
        } else {
          setError("root", { message: "로그인에 실패했습니다." });
        }
      }
    }
  };

  return (
    <main className="flex justify-center items-start w-full">
      {/* 로그인 영역 */}
      <section className="flex flex-col justify-start items-center w-full max-w-[400px] h-[1080px] px-5 pt-[244px] pb-10 bg-white max-sm:p-0 max-sm:px-5 max-sm:max-w-full max-sm:gap-16 max-sm:h-fit">
        {/* 모바일 헤더 */}
        <div className="sm:hidden flex justify-end items-center w-full h-[48px]">
          <Link href={"/"}>
            <Image
              src={"/login-close-btn.svg"}
              alt="로그인 창 닫기"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <>
          {/* 헤더 영역: 로고 및 환영 메시지 */}
          <header className="flex flex-col justify-center items-center gap-6">
            <Logo width={120} height={80} />
            <h1 className="font-semibold text-black text-nowrap">
              트립트립에 오신걸 환영합니다.
            </h1>
          </header>

          {/* 로그인 폼 */}
          <form
            onSubmit={handleSubmit(onLogin)}
            className="flex flex-col justify-center items-center gap-8 w-full max-w-[320px]"
          >
            <fieldset className="flex flex-col justify-center items-center w-full gap-6 border-none">
              <legend className="sr-only">로그인 정보 입력</legend>

              {/* 로그인 안내 문구 */}
              <p className="font-medium text-[#333333] text-[14px]">
                트립트립에 로그인 하세요.
              </p>

              {/* 이메일 및 비밀번호 입력 */}
              <div className="relative flex flex-col gap-3 w-full">
                <label htmlFor="email" className="sr-only">
                  이메일 입력
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해 주세요."
                  {...register("email")}
                  className={`flex px-4 py-2 w-full outline-none rounded-[8px] border ${
                    formState.errors.email
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />

                <label htmlFor="password" className="sr-only">
                  비밀번호 입력
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해 주세요."
                  {...register("password")}
                  className={`flex px-4 py-2 w-full outline-none rounded-[8px] border ${
                    formState.errors.password
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <span className="absolute bottom-[-25px] text-[#F66A6A] text-[12px] font-normal">
                  {formState.errors.email ? (
                    <p>{formState.errors.email?.message}</p>
                  ) : formState.errors.password ? (
                    <p>{formState.errors.password?.message}</p>
                  ) : (
                    <p>{formState.errors.root?.message}</p>
                  )}
                </span>
              </div>
            </fieldset>

            {/* 로그인 버튼 및 회원가입 링크 */}
            <footer className="flex flex-col justify-center items-center gap-6 w-full">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-[#2974e5] rounded-[8px] font-semibold text-lg text-white hover:bg-[#2974e5]/90"
              >
                로그인
              </button>
              <Link
                href={"/signup"}
                className="font-normal text-black text-sm hover:underline"
              >
                회원가입
              </Link>
            </footer>
          </form>
        </>
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
