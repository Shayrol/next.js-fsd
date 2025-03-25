import { Query } from "@/entities/api/graphql";

export default function ProductLocation({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const dataLocation = data?.fetchTravelproduct.travelproductAddress;

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <p className="font-bold text-[20px] text-gray-800">상세 위치</p>
        {dataLocation ? (
          <div className="flex justify-center items-center w-full h-[300px] rounded-[8px] bg-gray-100">
            location
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[300px] rounded-[8px] bg-gray-100">
            등록된 위치가 없습니다.
          </div>
        )}
      </section>
    </>
  );
}
