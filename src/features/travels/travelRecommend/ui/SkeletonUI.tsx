"use client";

export default function SkeletonUI() {
  return (
    <section className="flex flex-col gap-6 w-full relative max-sm:gap-3">
      <h1 className="font-bold text-black text-[28px] max-sm:text-[18px]">
        2025 낭만있게 마무리 하고 싶다면?
      </h1>
      <div className="flex gap-6 w-full max-sm:flex-col">
        <div className="w-full bg-gray-200 rounded-[8px] animate-pulse aspect-[1] max-sm:aspect-[1]"></div>
        <div className="w-full bg-gray-200 rounded-[8px] animate-pulse aspect-[1] max-sm:hidden"></div>
      </div>
    </section>
  );
}
