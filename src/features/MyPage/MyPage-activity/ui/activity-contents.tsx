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
import Pagination from "@/shared/ui/pagination/pagination";
import { useFetchTravelProductsCountISold } from "../api/useFetchTravelProductsCountISold";
import { useFetchTravelProductsCountIPicked } from "../api/useFetchTravelProductsCountIPicked";
import { useFetchDeleteTravelProduct } from "@/features/travel/travelWriter/api/useFetchDeleteTravelProduct";

export default function ActivityContents() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const page = Number(searchParams?.get("page")) || 1;
  const tab = searchParams?.get("tab") || "my-product";
  const { user } = useUserStore();

  // 나의 상품 삭제 st
  const [deleteTravelProduct] = useFetchDeleteTravelProduct();
  // 나의 상품 삭제 ed

  // 나의 상품 st
  const { data: ISoldData } = useFetchTravelProductsISold(
    { search, page },
    {
      skip: user === null || tab !== "my-product",
      // skip: tab !== "my-product",
    }
  );
  const { data: ISoldCount } = useFetchTravelProductsCountISold({
    skip: user === null || tab !== "my-product",
  });
  // 나의 상품 ed

  // 북마크 상품 st
  const { data: IPickedData } = useFetchTravelProductsIPicked(
    { search, page },
    { skip: user === null || tab !== "bookmark" }
  );

  const { data: IPickedCount } = useFetchTravelProductsCountIPicked({
    skip: user === null || tab !== "bookmark",
  });
  // 북마크 상품 ed

  const [sold, setSold] = useState<Travelproduct[] | undefined>();
  const [soldCount] = useState(ISoldCount?.fetchTravelproductsCountISold);

  const [picked, setPicked] = useState<Travelproduct[] | undefined>();
  const [pickedCount] = useState(IPickedCount?.fetchTravelproductsCountIPicked);

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
  const count = tab === "my-product" ? soldCount : pickedCount;
  console.log("data", data);
  console.log("count", count);

  const onClickDelete = async (travelproductId: string) => {
    try {
      await deleteTravelProduct({
        variables: {
          travelproductId,
        },
        update(cache) {
          cache.modify({
            fields: {
              fetchTravelproductsISold(existingRefs = [], { readField }) {
                return existingRefs.filter(
                  (productRef: any) =>
                    readField("_id", productRef) !== travelproductId
                );
              },
            },
          });
        },
      });
      alert("삭제되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  return (
    <section
      style={{ boxShadow: "0px 0px 20px 0px #00000014" }}
      className="flex flex-col gap-6 px-12 py-6 w-full rounded-[16px]"
    >
      {data?.length !== 0 ? (
        <div className="flex flex-col gap-2 w-full">
          {/* list header */}
          <div className="flex gap-2 px-6 py-4 w-full">
            <p className="flex justify-center items-center gap-2 min-w-[64px] font-medium text-sm text-gray-900">
              번호
            </p>
            <p className="flex justify-start items-center gap-2 w-full font-medium text-sm text-gray-900 text-nowrap">
              상품
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-sm text-gray-900">
              판매가격
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-sm text-gray-900">
              판매자
            </p>
            <p className="flex justify-center items-center gap-2 min-w-[100px] font-medium text-sm text-gray-900">
              날짜
            </p>
          </div>
          {/* list contents */}
          <ul className="flex flex-col gap-3 w-full">
            {data?.map((el) => (
              <Link href={`/travel/${el._id}`} key={el._id}>
                <li className="group relative cursor-pointer flex gap-2 px-6 py-3 w-full border border-gray-100 bg-white rounded-[8px]">
                  {/* _id */}
                  <p
                    className={`flex justify-center items-center gap-2 min-w-[64px] font-normal text-sm
                      ${el.soldAt ? "text-gray-400" : "text-gray-900"}
                    `}
                  >
                    {el._id.slice(0, 4)}
                  </p>
                  {/* name */}
                  <div className="flex justify-start gap-2 w-full truncate">
                    <p
                      className={`font-normal text-sm truncate
                        ${el.soldAt ? "text-gray-400" : "text-gray-900"}
                      `}
                    >
                      {el.name}
                    </p>
                    {el.soldAt && (
                      <span className="font-bold text-sm text-[#2974E5]">
                        판매완료
                      </span>
                    )}
                  </div>
                  {/* price */}
                  <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-sm text-gray-900">
                    {el.price?.toLocaleString()}원
                  </p>
                  {/* seller - 가운데 정렬 + ... 처리 */}
                  <div className="flex justify-center items-center max-w-[100px] bg-gray-100">
                    <p className="w-[100px] truncate text-center">
                      {el.seller?.name}
                    </p>
                  </div>
                  {/* createdAt */}
                  <p className="flex justify-center items-center gap-2 min-w-[100px] font-normal text-sm text-gray-900">
                    {formatDate(el.createdAt)}
                  </p>
                  {/* delete */}
                  {tab === "my-product" && (
                    <button
                      onClick={(e) => {
                        onClickDelete(el._id);
                        e.stopPropagation(); // 이벤트 전파 방지
                        e.preventDefault(); // 기본 동작 방지
                      }}
                      className={`absolute right-1.5 hidden group-hover:block transition-opacity duration-200
                        ${tab === "my-product" ? "block" : "hidden"}
                      `}
                    >
                      <Image
                        src="/mypage/delete.svg"
                        alt="trash"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </li>
              </Link>
            ))}
          </ul>
          <Pagination count={count} />
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
