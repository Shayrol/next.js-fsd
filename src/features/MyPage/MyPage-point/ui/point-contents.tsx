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

  console.log("data", data);
  console.log("data", data?.length);
  console.log("tab: ", tab);
  console.log("tab: ", PointButtonList[1].id);
  console.log("pointDataMap: ", pointDataMap);
  console.log("loading: ", LoadingData);
  console.log("buying: ", BuyingData);

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

// 구매후 잔액 계산이 안맞는 구간이 있음 (이유 모름..)
// 로그아웃 후 다른 아이디 로그인 시 이전 데이터가 남아있음 - client.clear 뭐시기로 캐시 초기화 하기
// 구매후 로그아웃 하면 로그인 버튼으로 변경이 되지 않음 - 저번과 똑같은 문제로 해결 했으나 이번은 뭐가 문제인지 모르겠음
// pagination 추가하기 + count 추가하기 (buying, selling, charging)
// 판매자 정보 불러오기 에러 (이유 모름...)

// 구매 클릭 시 모달 띄우기
// 비밀번호 변경 페이지 구현
// 회원가입 페이지 구현
// 모바일 뷰 구현
