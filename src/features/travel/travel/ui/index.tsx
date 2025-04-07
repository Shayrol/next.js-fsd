"use client";

import { useFetchTravelProduct } from "../api/useFetchTravelProduct";
import ProductBuyMobile from "./product-buy-mobile";
import TravelContents from "./travel-contents";

export default function Travel({ travelId }: { travelId: string }) {
  const { data } = useFetchTravelProduct({ travelId });

  return (
    <section className="flex flex-col justify-center items-center w-full gap-10">
      <TravelContents data={data} />

      {/* 모바일 환경 구매버튼 생성 - 브라우저 환경은 travel-info에 있음 */}
      <ProductBuyMobile data={data} />
    </section>
  );
}
