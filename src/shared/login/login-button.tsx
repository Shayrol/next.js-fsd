"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href={"/login"} className="flex justify-center items-center">
      <Image
        src="/layout/header/signIn.svg"
        alt="login-button"
        width={0}
        height={0}
        sizes="100vw"
        className="min-w-[93px] min-h-[40px]"
      />
    </Link>
  );
}

// 상태관리를 통해 로그인 정보 받아 변경하기
