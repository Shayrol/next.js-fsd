"use client";

import PasswordChange from "./PasswordChangeForm";

export default function MyPageChangePassword() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <p className="font-semibold text-lg text-black">비밀번호 변경</p>
      <PasswordChange />
    </section>
  );
}
