"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MyPageOptionButton({
  list,
}: {
  list: { id: string; label: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams?.get("tab");
  const [activeTab, setActiveTab] = useState(tab || list[0].id);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <section className="flex justify-start items-center gap-4 w-full">
      {list.map((el) => (
        <button
          key={el.id}
          onClick={() => handleTabClick(el.id)}
          className={`flex justify-center items-center px-4 py-3 font-semibold text-[16px] rounded-[8px] ${
            activeTab === el.id
              ? "text-white bg-black"
              : "text-black bg-gray-200 hover:bg-gray-300"
          } max-sm:px-2 max-sm:py-1`}
        >
          {el.label}
        </button>
      ))}
    </section>
  );
}
