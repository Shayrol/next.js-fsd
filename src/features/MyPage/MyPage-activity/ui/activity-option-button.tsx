"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ActivityOptionButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams?.get("tab");
  const [activeTab, setActiveTab] = useState(tab || "my-product");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <section className="flex justify-start items-center gap-4 w-full">
      <button
        onClick={() => handleTabClick("my-product")}
        className={`flex justify-center items-center px-4 py-3 font-semibold text-[16px] rounded-[8px] ${
          activeTab === "my-product"
            ? "text-white bg-black"
            : "text-black bg-gray-200 hover:bg-gray-300"
        }`}
      >
        나의 상품
      </button>
      <button
        onClick={() => handleTabClick("bookmark")}
        className={`flex justify-center items-center px-4 py-3 font-semibold text-[16px rounded-[8px] ${
          activeTab === "bookmark"
            ? "text-white bg-black"
            : "text-black bg-gray-200 hover:bg-gray-300"
        }`}
      >
        북마크
      </button>
    </section>
  );
}
