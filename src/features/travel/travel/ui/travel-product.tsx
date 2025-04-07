"use client";

import ProductHeader from "./product-header";
import { Query } from "@/entities/api/graphql";
import ProductInfo from "./product-info";
import dynamic from "next/dynamic";
import ProductLocation from "./product-location";

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
      {/* 제목, 부제목, 삭제, 링크, 위치, 북마크 */}
      <ProductHeader data={data} />
      {/* 이미지, 가격, 구매, 판매자 */}
      <ProductInfo data={data} />
      {/* 내용 + 모바일(제목, 부제목, 태그, 가격) */}
      <ProductContents data={data} />
      {/* 지도 */}
      <ProductLocation data={data} />
    </section>
  );
}
