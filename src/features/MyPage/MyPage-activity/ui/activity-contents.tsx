"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useFetchTravelProductsISold } from "../api/useFetchTravelProductsISold";
import { useFetchTravelProductsIPicked } from "../api/useFetchTravelProductIPicked";
import { formatDate } from "@/lib/dateUtils";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { Travelproduct } from "@/entities/api/graphql";
import Link from "next/link";

export default function ActivityContents() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const page = Number(searchParams?.get("page")) || 1;
  const tab = searchParams?.get("tab") || "my-product";
  const { user } = useUserStore();

  const { data: ISoldData } = useFetchTravelProductsISold(
    { search, page },
    {
      skip: user === null || tab !== "my-product",
      // skip: tab !== "my-product",
    }
  );

  const { data: IPickedData } = useFetchTravelProductsIPicked(
    { search, page },
    { skip: user === null || tab !== "bookmark" }
  );
  const [sold, setSold] = useState<Travelproduct[] | undefined>();
  const [picked, setPicked] = useState<Travelproduct[] | undefined>();

  useEffect(() => {
    if (ISoldData?.fetchTravelproductsISold) {
      setSold(ISoldData.fetchTravelproductsISold);
    }
  }, [ISoldData]);

  useEffect(() => {
    if (IPickedData?.fetchTravelproductsIPicked) {
      setPicked(IPickedData.fetchTravelproductsIPicked);
    }
  }, [IPickedData]);

  console.log("sold", sold);
  console.log("picked", picked);
  console.log("tab", tab);

  // useEffect(() => {
  //   if (tab === "my-products" && !soldCalled) refetchISold();
  //   if (tab === "bookmark" && !pickedCalled) refetchIPicked();
  // }, [tab, refetchISold, refetchIPicked, soldCalled, pickedCalled]);

  const data = tab === "my-product" ? sold : picked;
  console.log("data", data);

  return (
    <section
      style={{ boxShadow: "0px 0px 20px 0px #00000014" }}
      className="flex flex-col gap-6 px-12 py-6 w-full rounded-[16px]"
    >
      {data?.length !== 0 ? (
        <div className="flex flex-col gap-2 w-full">
          {/* list header */}
          <div className="flex gap-2 px-6 py-4 w-full">
            <p className="flex justify-center items-center gap-2 min-w-[64px] font-medium text-[16px] text-gray-900">
              번호
            </p>
            <p className="flex justify-start items-center gap-2 w-full font-medium text-[16px] text-gray-900">
              상품
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
              판매가격
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
              판매자
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-[16px] text-gray-900">
              날짜
            </p>
          </div>
          {/* list contents */}
          <ul className="flex flex-col gap-3 w-full">
            {data?.map((el) => (
              <Link href={`/travel/${el._id}`} key={el._id}>
                <li className="group relative cursor-pointer flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]">
                  {/* _id */}
                  <p className="flex justify-center items-center gap-2 min-w-[64px] font-normal text-[16px] text-gray-900">
                    {el._id.slice(0, 4)}
                  </p>
                  {/* name */}
                  <p className="w-full font-normal text-[16px] text-gray-900 truncate">
                    {el.name}
                  </p>
                  {/* price */}
                  <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
                    {el.price?.toLocaleString()}원
                  </p>
                  {/* seller - 가운데 정렬 + ... 처리 */}
                  <div className="flex justify-center items-center max-w-[100px] bg-gray-100">
                    <p className="w-[100px] truncate text-center">{el.name}</p>
                  </div>
                  {/* createdAt */}
                  <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-[16px] text-gray-900">
                    {formatDate(el.createdAt)}
                  </p>
                  {/* delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      e.preventDefault(); // 기본 동작 방지
                    }}
                    className="absolute right-1.5 hidden group-hover:block transition-opacity duration-200"
                  >
                    <Image
                      src="/mypage/delete.svg"
                      alt="trash"
                      width={24}
                      height={24}
                    />
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full aspect-[16/9]">
          <p className="font-semibold text-[18px] text-gray-400">
            등록된 상품이 없습니다.
          </p>
        </div>
      )}
    </section>
  );
}

// pagination 추가하기
// 북마크 기능 추가하기 (게시글 상세페이지에서 북마크 추가하기)
// 나의 상품 삭제 기능 추가하기 (버튼 구현 완료 상태)
