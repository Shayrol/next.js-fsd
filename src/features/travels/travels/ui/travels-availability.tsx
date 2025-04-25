// 예약 가능, 마감 확인 버튼

"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function TravelsAvailability() {
  const searchParams = useSearchParams();
  const closed = searchParams?.get("availability");
  const router = useRouter();

  const setQueryParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(String(searchParams));
    newParams.set(key, value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-start items-start gap-4 w-full">
      <button
        onClick={() => setQueryParam("availability", "available")}
        className={`h-fit px-4 py-3 gap[10px] rounded-[8px] text-base max-sm:px-3 max-sm:py-2 max-sm:text-sm
          ${
            closed === "closed"
              ? "bg-gray-200/90 text-black font-medium"
              : "bg-black text-white font-semibold"
          }
          `}
      >
        예약 가능 숙소
      </button>
      <button
        onClick={() => setQueryParam("availability", "closed")}
        className={`h-fit px-4 py-3 gap[10px] rounded-[8px] text-base max-sm:px-3 max-sm:py-2 max-sm:text-sm
          ${
            closed === "closed"
              ? "bg-black text-white font-semibold"
              : "bg-gray-200/90 text-black font-medium"
          }
          `}
      >
        예약 마감 숙소
      </button>
    </div>
  );
}
