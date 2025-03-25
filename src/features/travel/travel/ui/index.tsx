"use client";

import TravelContents from "./travel-contents";

export default function Travel({ travelId }: { travelId: string }) {
  return (
    <section className="flex flex-col justify-center items-center w-full gap-10">
      <TravelContents travelId={travelId} />
    </section>
  );
}
