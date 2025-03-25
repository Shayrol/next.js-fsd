import { Travel } from "@/features/travel/travel";

type Params = { travelId: string };

export default async function TravelPage({ params }: { params: Params }) {
  const { travelId } = await params;
  return <Travel travelId={travelId} />;
}
