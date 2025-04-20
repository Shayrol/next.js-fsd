"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PasswordChangeSchema } from "../api/schema";
import { useResetUserPassword } from "../api/useResetUserPassword";

type IForm = {
  password: string;
  confirmPassword?: string;
};

export default function PasswordChange() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(PasswordChangeSchema),
    // mode: "onChange",
  });

  const [resetUserPassword] = useResetUserPassword();

  const onClickChangePassword = async (data: IForm) => {
    const result = await resetUserPassword({
      variables: {
        password: data.password,
      },
    });
    console.log("비밀번호 변경: ", result.data?.resetUserPassword);
  };

  return (
    <form
      onClick={handleSubmit(onClickChangePassword)}
      className="flex flex-col justify-center items-end gap-6 w-full"
    >
      {/* 비밀번호 */}
      <div className="flex flex-col w-full gap-1">
        <p className="font-medium text-base text-black">
          새 비밀번호
          <span className="font-medium text-base text-[#F66A6A]">*</span>
        </p>
        <input
          {...register("password")}
          type="password"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-[8px] outline-none"
          placeholder="새 비밀번호를 입력해 주세요."
        />
      </div>

      {/* 비밀번화 확인 */}
      <div className="relative flex flex-col w-full gap-1">
        <p className="font-medium text-base text-black">
          새 비밀번호 확인
          <span className="font-medium text-base text-[#F66A6A]">*</span>
        </p>
        <input
          {...register("confirmPassword")}
          type="password"
          className={`w-full px-4 py-3 bg-white border rounded-[8px] outline-none
              ${
                formState.errors.confirmPassword
                  ? "border-[#F66A6A]"
                  : "border-gray-200"
              }
            `}
          placeholder="새 비밀번호를 확인해 주세요."
        />
        {formState.errors.confirmPassword && (
          <span className="absolute bottom-[-20px] font-semibold text-xs text-red-500">
            {formState.errors.confirmPassword?.message}
          </span>
        )}
      </div>

      {/* 버튼 */}
      <button
        type="submit"
        disabled={!formState.isValid}
        className={`flex justify-center items-center gap-2 px-4 py-3  font-semibold text-lg  rounded-[8px]
            ${
              formState.isValid
                ? "bg-[#2974E5] text-white"
                : "bg-gray-300 text-gray-100"
            }
          `}
      >
        비밀번호 변경
      </button>
    </form>
  );
}

// 비밀번호 1111 => 2222로 변겅
//
// 비밀번호 변경 완료 모달 띄우기 + /mypage/change-password에서 /mypage로 이동하기
// 구매하기 클릭 시 취소, 확인 모달 띄우기
// 모바일 뷰 구현하기
// 구매 후 로그아웃 클릭 시 ui 변경 해결하기 (우선 reload를 통해 새로고침으로 해결함)
