"use client";

import { useFetchPointTransactions } from "../api/useFetchPointTransactions";
import { useSearchParams } from "next/navigation";
import { useFetchPointTransactionsOfLoading } from "../api/useFetchPointTransactionsOfLoading";
import { PointButtonList } from "../../constants/option-button-list";
import { useUserStore } from "@/stores/userStore";
import { PointTransaction } from "@/entities/api/graphql";
import AllHeader from "./list/header/all-header";
import LoadingHeader from "./list/header/loading-header";
import BuyingHeader from "./list/header/buying-header";
import SellingHeader from "./list/header/selling-header";
import AllContents from "./list/contents/all-contents";
import LoadingContents from "./list/contents/loading-contents";
import BuyingContents from "./list/contents/buying-contents";
import SellingContents from "./list/contents/selling-contents";
import { useFetchPointTransactionsOfSelling } from "../api/useFetchPointTransactionsOfSelling";
import { useFetchPointTransactionsOfBuying } from "../api/usefetchPointTransactionsOfBuying";

export default function PointContents() {
  const searchParams = useSearchParams();
  // const search = searchParams?.get("search") || "";
  const page = Number(searchParams?.get("page")) || 1;
  const tab = searchParams?.get("tab") || PointButtonList[0].id;
  const { user } = useUserStore();

  // 전체내역
  const { data: PointData } = useFetchPointTransactions(
    { page },
    {
      skip: user === null || tab !== PointButtonList[0].id,
    }
  );
  // 충전내역
  const { data: LoadingData } = useFetchPointTransactionsOfLoading(
    { page },
    {
      skip: user === null || tab !== PointButtonList[1].id,
    }
  );

  // 구매내역
  const { data: BuyingData } = useFetchPointTransactionsOfBuying(
    { page },
    { skip: user === null || tab !== PointButtonList[2].id }
  );

  // 판매내역
  const { data: SellingData } = useFetchPointTransactionsOfSelling(
    {
      page,
    },
    {
      skip: user === null || tab !== PointButtonList[3].id,
    }
  );

  const pointDataMap: Record<string, PointTransaction[] | undefined> = {
    all: PointData?.fetchPointTransactions ?? [],
    loading: LoadingData?.fetchPointTransactionsOfLoading ?? [],
    buying: BuyingData?.fetchPointTransactionsOfBuying ?? [],
    selling: SellingData?.fetchPointTransactionsOfSelling ?? [],
  };

  const data = pointDataMap[tab] as PointTransaction[];

  return (
    <section
      style={{ boxShadow: "0px 0px 20px 0px #00000014" }}
      className="flex flex-col gap-6 px-12 py-6 w-full rounded-[16px] max-sm:p-4 max-sm:gap-4"
    >
      {data?.length !== 0 ? (
        <div className="flex flex-col gap-2 w-full">
          {/* list header */}
          <div className="flex gap-2 px-6 py-4 w-full max-sm:px-2 max-sm:py-1 max-sm:gap-2">
            {tab === "all" && <AllHeader />}
            {tab === "loading" && <LoadingHeader />}
            {tab === "buying" && <BuyingHeader />}
            {tab === "selling" && <SellingHeader />}
          </div>
          {/* list contents */}
          {tab === "all" && <AllContents data={data} />}
          {tab === "loading" && <LoadingContents data={data} />}
          {tab === "buying" && <BuyingContents data={data} />}
          {tab === "selling" && <SellingContents data={data} />}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full aspect-[16/9]">
          <p className="font-semibold text-[18px] text-gray-400">
            상품 내역이 없습니다.
          </p>
        </div>
      )}
    </section>
  );
}
