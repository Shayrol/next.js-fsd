"use client";

import { useFetchTravelProduct } from "../api/useFetchTravelProduct";
import TravelProduct from "./travel-product";

export default function TravelContents({ travelId }: { travelId: string }) {
  const { data } = useFetchTravelProduct({ travelId });

  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full">
      <TravelProduct data={data} />
    </section>
  );
}
