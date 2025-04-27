"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FormState } from "react-hook-form";

interface IProps {
  formState: FormState<{
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }>;
}

export default function SignUpModal({ formState }: IProps) {
  const [open, setOpen] = useState(false); // 모달 열림 여부 제어

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="submit"
          disabled={!formState.isValid}
          className={`flex justify-center items-center px-4 py-3 gap-2 w-full rounded-[8px] font-semibold text-lg
            ${
              formState.isValid
                ? "bg-[#2974E5] text-white"
                : "bg-gray-300 text-gray-100"
            }
            `}
        >
          회원가입
        </button>
        {/* <button
          type="submit"
          disabled={!formState.isValid}
          className={`flex justify-center items-center gap-2 px-4 py-3  font-semibold text-lg  rounded-[8px] max-sm:text-sm
            ${
              formState.isValid
                ? "bg-[#2974E5] text-white"
                : "bg-gray-300 text-gray-100"
            }
          `}
        >
          비밀번호 변경
        </button> */}
      </DialogTrigger>
      <DialogContent className="w-[480px] max-sm:w-[320px] rounded-[8px]">
        <DialogHeader>
          {/* DialogTitle이 꼭 있어야 함 */}
          <DialogTitle></DialogTitle>
          <div className="flex flex-col justify-center items-center gap-6">
            <header className="flex flex-col justify-center items-center gap-3">
              <p className="font-semibold text-lg text-black">
                비밀번호 변경 완료
              </p>
              <p className="font-medium text-sm text-gray-800">
                비밀번호가 변경 되었습니다.
              </p>
            </header>

            <div className="flex justify-center items-center gap-3 w-full">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex justify-center items-center min-w-[96px] max-w-[120px] w-full px-3 py-2 gap-2 bg-[#2974E5] border border-[#2974E5] font-semibold text-sm text-white rounded-[8px]"
              >
                확인
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
