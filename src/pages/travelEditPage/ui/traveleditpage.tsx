"use client";

import { useFetchTravelProduct } from "@/features/travel/travel/api/useFetchTravelProduct";
import TravelWriterForm from "@/features/travel/travelWriter/ui/TravelWriterForm";
import { useParams } from "next/navigation";

export default function TravelEditPage() {
  const params = useParams();
  const travelId = String(params?.travelId);
  const { data } = useFetchTravelProduct({ travelId });

  return (
    <article className="flex flex-col gap-10 w-full">
      <h3 className="font-bold text-[20px] w-full">숙박권 판매하기</h3>
      <TravelWriterForm edit={true} data={data} />
    </article>
  );
}
