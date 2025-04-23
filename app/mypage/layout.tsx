"use client";

import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const MenuList = [
  { name: "거래내역&북마크", path: "/mypage/activity" },
  { name: "포인트 사용 내역", path: "/mypage/point" },
  { name: "비밀번호 변경", path: "/mypage/change-password" },
];

function MyPageLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const { user } = useUserStore();

  console.log("My point user: ", user);

  return (
    <main className="flex flex-col justify-center items-start gap-10 w-full max-w-[1280px] max-sm:gap-2">
      <h1 className="font-bold text-[28px] text-black max-sm:text-base">
        마이 페이지
      </h1>
      <section className="flex flex-col gap-3 p-6 w-full min-w-[280px] border border-gray-300 bg-white rounded-[8px]">
        <p className="font-semibold text-[18px] text-black">내 정보</p>

        {/* 프로필 */}
        <div className="flex items-center gap-1">
          <Image
            src={"/not-images/not-profile.svg"}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="font-medium text-base text-[#333333]">{user?.name}</p>
        </div>
        <hr className="w-full border border-gray-100" />

        {/* point */}
        <div className="flex items-center gap-2 max-sm:gap-1">
          <Image
            src={"/mypage/point.svg"}
            alt="point"
            width={24}
            height={24}
            className="max-sm:w-4 max-sm:h-4"
          />
          <div className="flex gap-1">
            <p className="font-medium text-xl text-black max-sm:text-sm">
              {user?.userPoint?.amount?.toLocaleString()}
            </p>
            <span className="font-medium text-xl text-black max-sm:text-sm">
              P
            </span>
          </div>
        </div>
        <hr className="w-full border border-gray-100" />

        {/* menu */}
        <div className="flex flex-col gap-2 w-full">
          {MenuList.map((el, index) => (
            <Link
              href={el.path}
              key={index}
              className={`flex justify-between items-center px-3 py-2 w-full rounded-[8px] hover:bg-gray-100
        ${pathName === el.path ? "bg-gray-100" : "bg-white"}
      `}
            >
              <p className="font-semibold text-base text-black max-sm:text-sm">
                {el.name}
              </p>
              <Image
                src={"/mypage/right_arrow.svg"}
                alt="arrow"
                width={24}
                height={24}
                className="max-sm:w-4 max-sm:h-4"
              />
            </Link>
          ))}
        </div>
      </section>
      {children}
    </main>
  );
}

const MyPageLayoutWrap = memo(MyPageLayout);
export default MyPageLayoutWrap;
