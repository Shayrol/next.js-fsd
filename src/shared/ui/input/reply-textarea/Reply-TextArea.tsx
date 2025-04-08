"use client";

import { IFormInput } from "@/features/Reply/Reply/Board/type";
import { UseFormRegister } from "react-hook-form";

interface ReplyTextAreaProps {
  register: UseFormRegister<IFormInput>;
  name: keyof IFormInput;
}

export default function ReplyTextArea(props: ReplyTextAreaProps) {
  const { register, name } = props;

  return (
    <textarea
      {...register(name, { required: "내용을 입력해 주세요." })}
      className="w-full h-[144px] rounded-[8px] border border-[#d4d3d3] px-4 py-3 resize-none"
      placeholder="댓글을 입력해 주세요."
    />
  );
}
