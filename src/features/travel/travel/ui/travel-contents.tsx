"use client";

import { Query } from "@/entities/api/graphql";
import TravelProduct from "./travel-product";

export default function TravelContents({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  console.log("travel data: ", data?.fetchTravelproduct);

  return (
    <section className="flex flex-col justify-center items-center gap-10 w-full">
      <TravelProduct data={data} />
    </section>
  );
}
