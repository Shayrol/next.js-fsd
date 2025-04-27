"use client";

import { User } from "@/entities/api/graphql";
import Image from "next/image";
import Link from "next/link";
import PointModal from "./point-modal";
import { useLogoutUser } from "../api/useLogoutUser";
import Cookie from "js-cookie";

export default function MobileProfileModal({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: User;
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
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        /> // 배경 클릭 시 닫기
      )}
      <section
        className={`
                        fixed top-0 right-0 z-50 h-full w-[300px] bg-white
                        transition-transform duration-300
                        ${open ? "translate-x-0" : "translate-x-full"}
                      `}
      >
        <header className="flex justify-between items-center px-5 w-full min-h-12">
          <Image
            src={"/layout/header/logo-header.svg"}
            alt="logo"
            width={36}
            height={36}
          />
          <button onClick={() => setOpen(false)}>
            <Image src={"/close.svg"} alt="close" width={24} height={24} />
          </button>
        </header>
        <article className="flex flex-col pl-5 py-4 gap-3 w-full">
          <section className="flex justify-start items-center gap-1 w-full">
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
            <p className="font-medium text-base text-gray-800">{user?.name}</p>
          </section>
          <hr className="border border-gray-100" />
          <section className="flex justify-start items-center gap-2 w-full">
            <Image
              src={"/mypage/point.svg"}
              alt="point"
              width={24}
              height={24}
            />
            <p className="font-medium text-sm text-black">
              {user?.userPoint?.amount?.toLocaleString()} P
            </p>
          </section>
          <hr className="border border-gray-100" />
          <section className="flex flex-col gap-2 w-full">
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
              <p className="font-normal text-base text-black">로그아웃</p>
            </Link>
          </section>
        </article>
      </section>
    </>
  );
}
