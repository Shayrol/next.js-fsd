"use client";

import ProductHeader from "./product-header";
import { Query } from "@/entities/api/graphql";
import ProductInfo from "./product-info";
import dynamic from "next/dynamic";
import ProductLocation from "./product-location";
// import ProductContents from "./product-contents";

const ProductContents = dynamic(() => import("./product-contents"), {
  ssr: false,
});

export default function TravelProduct({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  return (
    <section className="flex flex-col gap-6 w-full">
      <ProductHeader data={data} />
      <ProductInfo data={data} />
      <ProductContents data={data} />
      <ProductLocation data={data} />
    </section>
  );
}
