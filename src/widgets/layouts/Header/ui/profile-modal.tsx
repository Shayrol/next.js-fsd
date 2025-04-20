"use client";

import { User } from "@/entities/api/graphql";
import Image from "next/image";
import Link from "next/link";
import { useLogoutUser } from "../api/useLogoutUser";
import Cookie from "js-cookie";
import PointModal from "./point-modal";

export default function ProfileModal({
  user,
  setOpen,
}: {
  user?: User;
  setOpen: (open: boolean) => void;
}) {
  const [logoutUser] = useLogoutUser();

  const onClickLogout = async () => {
    try {
      await logoutUser({
        update(cache) {
          cache.modify({
            fields: {
              fetchUserLoggedIn() {
                return null;
              },
            },
          });
        },
      });
      Cookie.remove("accessToken");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="absolute flex flex-col gap-3 left-[-170px] top-0 z-20 min-w-[240px] p-5 border border-gray-100 bg-white rounded-[8px]">
      {/* profile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        className="flex justify-between items-center gap-1 w-full"
      >
        <Image
          src={
            user?.picture
              ? `https://storage.googleapis.com/${user.picture}`
              : `/not-images/not-profile.svg`
          }
          alt="profile"
          width={40}
          height={40}
        />
        <p className="flex justify-start items-center w-full">{user?.name}</p>

        <Image
          src={"/layout/header/down_arrow.svg"}
          alt="down-arrow"
          width={24}
          height={24}
          className="rotate-180"
        />
      </button>

      <hr className="w-full h-[1px] bg-gray-200" />

      {/* point */}
      <div className="flex justify-start items-center gap-2 w-full">
        <Image src={"/mypage/point.svg"} alt="point" width={24} height={24} />
        <p className="flex gap-1 font-medium text-[16px] text-black">
          {/* {user.userPoint?.amount?.toLocaleString()} P */}
          {user?.userPoint?.amount?.toLocaleString()} P
        </p>
      </div>

      <hr className="w-full h-[1px] bg-gray-200" />

      {/* charge, sign out */}
      <div className="flex flex-col gap-2 w-full">
        {/* charge */}
        <PointModal />
        {/* sign out */}
        <Link
          href={"/"}
          onClick={onClickLogout}
          className="flex justify-start items-center gap-2 py-2 w-full"
        >
          <Image
            src={"/login-signin-btn.svg"}
            alt="signIn"
            width={16}
            height={16}
          />
          <p className="font-normal text-[16px] text-black">로그아웃</p>
        </Link>
      </div>
    </div>
  );
}

// 포인트 충전 버튼 기능 추가하기 포트원 기능 우선 구현했으며
// 추가적인 디테일 손 봐야함
// 포트원 요청 함수는 hook를 통해 분리함
// 포트원 storeId, chanelKey는 수업에서 제공되는 값 사용해야 함
//
// 포인트 충전이 되면 구매하기 기능 구현하기
