"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../api/schema";
import { useRouter } from "next/navigation";
import { useCreateUser } from "../api/useCreateUser";
// import { useApolloClient } from "@apollo/client";

interface IForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [createUser] = useCreateUser();

  const { handleSubmit, register, formState, setError, setValue } =
    useForm<IForm>({
      resolver: yupResolver(SignUpSchema),
      mode: "onChange",
    });

  const onSignUp = async (data: IForm) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      });
      alert("회원가입을 축하 드립니다.");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setValue("email", "");

        if (error.message.includes("이미 존재하는 이메일입니다.")) {
          setError("email", {
            message: "이미 존재하는 이메일입니다.",
          });
        }
      }
    }
  };

  return (
    <main className="flex justify-center items-start w-full">
      {/* 로그인 영역 */}
      <section className="flex flex-col justify-start items-center w-full h-fit max-w-[400px] px-5 pt-[244px] pb-10 bg-white max-sm:p-0 max-sm:px-5 max-sm:max-w-full max-sm:gap-16">
        {/* 모바일 헤더 */}
        <header className="sm:hidden flex justify-end items-center w-full h-[48px]">
          <Link href={"/login"}>
            <Image
              src={"/login-close-btn.svg"}
              alt="회원가입 창 닫기"
              width={24}
              height={24}
            />
          </Link>
        </header>
        <form
          onSubmit={handleSubmit(onSignUp)}
          className="flex flex-col justify-center items-center gap-6 w-full max-w-[320px]"
        >
          <fieldset className="flex flex-col justify-center items-center gap-6 w-full">
            <p className="flex justify-center items-center w-full font-semibold text-lg text-black">
              회원가입
            </p>
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <p className="font-medium text-sm text-gray-800 text-nowrap">
                회원가입을 위해 아래 빈칸을 모두 채워 주세요.
              </p>
              <div className="relative flex flex-col justify-center items-center gap-2 w-full">
                <label className="flex justify-start items-center gap-1 w-full font-normal text-xs text-gray-800">
                  이메일
                  <span className="font-medium text-base text-[#F66A6A]">
                    *
                  </span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  className={`w-full px-4 py-2 outline-none border rounded-[8px] font-normal text-sm text-gray-400
                      ${
                        formState.errors.email
                          ? "border-[#F66A6A]"
                          : "border-gray-200"
                      }
                    `}
                />
                {formState.errors.email && (
                  <p className="absolute bottom-[-20px] right-0 font-normal text-[#F66A6A] text-xs">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col justify-center items-center gap-2 w-full">
                <label className="flex justify-start items-center gap-1 w-full font-normal text-xs text-gray-800">
                  이름
                  <span className="font-medium text-base text-[#F66A6A]">
                    *
                  </span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  className={`w-full px-4 py-2 outline-none border rounded-[8px] font-normal text-sm text-gray-400
                    ${
                      formState.errors.name
                        ? "border-[#F66A6A]"
                        : "border-gray-200"
                    }
                  `}
                />
                {formState.errors.name && (
                  <p className="absolute bottom-[-20px] right-0 font-normal text-[#F66A6A] text-xs">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col justify-center items-center gap-2 w-full">
                <label className="flex justify-start items-center gap-1 w-full font-normal text-xs text-gray-800">
                  비밀번호
                  <span className="font-medium text-base text-[#F66A6A]">
                    *
                  </span>
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  className={`w-full px-4 py-2 outline-none border rounded-[8px] font-normal text-sm text-gray-400
                    ${
                      formState.errors.password
                        ? "border-[#F66A6A]"
                        : "border-gray-200"
                    }
                  `}
                />
                {formState.errors.password && (
                  <p className="absolute bottom-[-20px] right-0 font-normal text-[#F66A6A] text-xs">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col justify-center items-center gap-2 w-full">
                <label className="flex justify-start items-center gap-1 w-full font-normal text-xs text-gray-800">
                  비밀번호 확인
                  <span className="font-medium text-base text-[#F66A6A]">
                    *
                  </span>
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  className={`w-full px-4 py-2 outline-none border rounded-[8px] font-normal text-sm text-gray-400
                    ${
                      formState.errors.confirmPassword
                        ? "border-[#F66A6A]"
                        : "border-gray-200"
                    }
                  `}
                />
                {formState.errors.confirmPassword && (
                  <p className="absolute bottom-[-20px] right-0 font-normal text-[#F66A6A] text-xs">
                    {formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="flex justify-center items-center px-4 py-3 gap-2 w-full bg-[#2974E5] rounded-[8px] font-semibold text-lg text-white"
          >
            회원가입
          </button>
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
