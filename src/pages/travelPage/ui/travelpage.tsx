import { TravelAd } from "@/features/travel/travelAd";
import { TravelRecommend } from "@/features/travel/travelRecommend";
import { Travels } from "@/features/travel/travels";

export default function TravelPage() {
  return (
    <main className="flex flex-col gap-[64px] justify-center items-center w-full border border-red-500">
      <TravelRecommend />
      <TravelAd />
      <Travels />
    </main>
  );
}
