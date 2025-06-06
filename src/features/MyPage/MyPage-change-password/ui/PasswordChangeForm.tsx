"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PasswordChangeSchema } from "../api/schema";
import { useResetUserPassword } from "../api/useResetUserPassword";
import PasswordModal from "./password-button-modal";

type IForm = {
  password: string;
  confirmPassword?: string;
};

export default function PasswordChange() {
  const { register, handleSubmit, formState, reset } = useForm({
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
    if (result.data?.resetUserPassword) {
      reset();
    }
    console.log("비밀번호 변경: ", result.data?.resetUserPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onClickChangePassword)}
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
      <PasswordModal formState={formState} />
    </form>
  );
}
