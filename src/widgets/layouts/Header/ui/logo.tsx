"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="block p-2">
      <Image
        src="/layout/header/logo-header.svg"
        alt="logo-image"
        width={0}
        height={0}
        sizes="100vw"
        className="min-w-[56px] min-h-[32px]"
      />
    </Link>
  );
}
