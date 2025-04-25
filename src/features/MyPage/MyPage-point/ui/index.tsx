"use client";

import { PointButtonList } from "../../constants/option-button-list";
import MyPageOptionButton from "../../ui/mypage-option-button";
import PointContents from "./point-contents";

export default function MyPagePoint() {
  return (
    <section className="flex flex-col justify-center items-center gap-6 w-full">
      <MyPageOptionButton list={PointButtonList} />
      <PointContents />
    </section>
  );
}
