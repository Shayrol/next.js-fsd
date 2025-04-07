import { Query } from "@/entities/api/graphql";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";

export default function ProductBuyMobile({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const { user } = useUserStore();

  return (
    <section className="flex justify-center items-center gap-[10px] pb-5 w-full min-[810px]:hidden">
      <div className="flex justify-center items-center py-4 w-full">
        {user?._id !== data?.fetchTravelproduct.seller?._id ? (
          <button className="flex justify-center items-center px-3 py-4 gap-2 w-full bg-[#2974E5] font-semibold text-[16px] text-white rounded-[8px]">
            구매하기
          </button>
        ) : (
          <Link
            href={`/travel/${data?.fetchTravelproduct._id}/edit`}
            className="flex justify-center items-center px-3 py-4 gap-2 w-full bg-[#2974E5] font-semibold text-[16px] text-white rounded-[8px]"
          >
            수정하기
          </Link>
        )}
      </div>
    </section>
  );
}
