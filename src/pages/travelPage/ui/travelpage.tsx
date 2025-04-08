import { TravelReply } from "@/features/Reply/Reply/Travel";
import { Travel } from "@/features/travel/travel";

type Params = { travelId: string };

export default async function TravelPage({ params }: { params: Params }) {
  const { travelId } = await params;

  return (
    <main className="flex flex-col justify-center items-center gap-10 w-full">
      <Travel travelId={travelId} />
      <TravelReply travelId={travelId} />
    </main>
  );
}
