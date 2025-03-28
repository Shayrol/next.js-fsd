"use client";

import ProductBuyMobile from "./product-buy-mobile";
import TravelContents from "./travel-contents";

export default function Travel({ travelId }: { travelId: string }) {
  return (
    <section className="flex flex-col justify-center items-center w-full gap-10">
      <TravelContents travelId={travelId} />

      {/* 모바일 환경 구매버튼 생성 - 브라우저 환경은 travel-info에 있음 */}
      <ProductBuyMobile />
    </section>
  );
}

// travel location 추가 및 댓글 추가
// 공유하기 추가, location 아이콘 hover 추가
// 등록하기 추가
// 삭제 추가
// 마이페이지 추가
// 포인트 충전 추가
