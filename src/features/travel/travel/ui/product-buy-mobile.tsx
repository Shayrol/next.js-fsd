"use client";

import { Query } from "@/entities/api/graphql";
import { useUserStore } from "@/stores/userStore";
import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useCreatePointTransactionOfBuyingAndSelling } from "../api/useCreatePointTransactionOfBuyingAndSelling";
import { useRouter } from "next/navigation";
import { FETCH_USER_LOGGED_IN } from "@/entities/api/auth/useFetchUserLoggedIn";

export default function ProductBuyMobile({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const { user } = useUserStore();
  const router = useRouter();

  const [createPointTransactionOfBuyingAndSelling] =
    useCreatePointTransactionOfBuyingAndSelling();
  const client = useApolloClient();

  const onClickBuying = async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: data?.fetchTravelproduct._id,
        },
        refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
        awaitRefetchQueries: true,
      });
      await client.clearStore();
      router.push("/travel");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Buying and Selling API error: ", error.message);
      }
    }
  };

  return (
    <section className="flex justify-center items-center gap-[10px] pb-5 w-full min-[810px]:hidden">
      <div className="flex justify-center items-center py-4 w-full">
        {user?._id !== data?.fetchTravelproduct.seller?._id ? (
          <button
            onClick={onClickBuying}
            className="flex justify-center items-center px-3 py-4 gap-2 w-full bg-[#2974E5] font-semibold text-[16px] text-white rounded-[8px]"
          >
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
