import { TravelAd } from "@/features/travels/travelAd";
import { TravelRecommend } from "@/features/travels/travelRecommend";
import { Travels } from "@/features/travels/travels";

export default function TravelsPage() {
  return (
    <main className="flex flex-col gap-6 justify-center items-center w-full border border-red-500">
      <TravelRecommend />
      <TravelAd />
      <Travels />
    </main>
  );
}
