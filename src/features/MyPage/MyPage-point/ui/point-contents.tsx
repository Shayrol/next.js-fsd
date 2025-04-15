"use client";

import { useFetchPointTransactions } from "../api/useFetchPointTransactions";
import { useSearchParams } from "next/navigation";
import { useFetchPointTransactionsOfLoading } from "../api/useFetchPointTransactionsOfLoading";
import { PointButtonList } from "../../constants/option-button-list";
import { useUserStore } from "@/stores/userStore";
import Pagination from "@/shared/ui/pagination/pagination";
import { PointTransaction } from "@/entities/api/graphql";
import AllHeader from "./list/header/all-header";
import LoadingHeader from "./list/header/loading-header";
import BuyingHeader from "./list/header/buying-header";
import SellingHeader from "./list/header/selling-header";
import AllContents from "./list/contents/all-contents";
import LoadingContents from "./list/contents/loading-contents";
import BuyingContents from "./list/contents/buying-contents";
import SellingContents from "./list/contents/selling-contents";

export default function PointContents() {
  const searchParams = useSearchParams();
  // const search = searchParams?.get("search") || "";
  const page = Number(searchParams?.get("page")) || 1;
  const tab = searchParams?.get("tab") || PointButtonList[0].id;
  const { user } = useUserStore();

  const { data: PointData } = useFetchPointTransactions(
    { page },
    {
      skip: user === null || tab !== PointButtonList[0].id,
    }
  );
  const { data: LoadingData } = useFetchPointTransactionsOfLoading(
    { page },
    {
      skip: user === null || tab !== PointButtonList[1].id,
    }
  );

  const pointDataMap: Record<string, PointTransaction[] | undefined | number> =
    {
      all: PointData?.fetchPointTransactions,
      loading:
        LoadingData?.fetchPointTransactionsCountOfLoading !== undefined
          ? LoadingData.fetchPointTransactionsCountOfLoading
          : [],
      buying: [], // 추후 BuyingData로 교체 가능
      selling: [], // 추후 SellingData로 교체 가능
    };
  const data = pointDataMap[tab] as PointTransaction[];

  console.log("data", data);
  console.log("data", data?.length);
  return (
    <section
      style={{ boxShadow: "0px 0px 20px 0px #00000014" }}
      className="flex flex-col gap-6 px-12 py-6 w-full rounded-[16px]"
    >
      {data?.length !== 0 ? (
        <div className="flex flex-col gap-2 w-full">
          {/* list header */}
          <div className="flex gap-2 px-6 py-4 w-full">
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
          <Pagination />
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

// 포트원 구매 기능 추가하기
// 리스트 디테일 구현하기
