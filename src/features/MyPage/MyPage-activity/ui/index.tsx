"use client";

import ActivityContents from "./activity-contents";
import ActivityOptionButton from "./activity-option-button";
import ActivitySearch from "./activity-search";

export default function MyPageActivity() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <ActivityOptionButton />
      <ActivitySearch />
      <ActivityContents />
    </section>
  );
}

// 마이페이지 구현하기
