"use client";

import { ActionButtonList } from "../../constants/option-button-list";
import MyPageOptionButton from "../../ui/mypage-option-button";
import ActivityContents from "./activity-contents";
import ActivitySearch from "./activity-search";

export default function MyPageActivity() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <MyPageOptionButton list={ActionButtonList} />
      <ActivitySearch />
      <ActivityContents />
    </section>
  );
}

// 마이페이지 구현하기
