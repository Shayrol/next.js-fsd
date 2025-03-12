"use client";

import Image from "next/image";
import Link from "next/link";

interface IProps {
  width: number;
  height: number;
}

export default function Logo({ width, height }: IProps) {
  return (
    <Link href={"/"} className="block p-2">
      <Image
        src="/layout/header/logo-header.svg"
        alt="logo-image"
        width={width}
        height={height}
        sizes="100vw"
        className={`min-w-[${width}px] min-h-[${height}px]`}
      />
    </Link>
  );
}
