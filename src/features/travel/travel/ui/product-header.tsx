// 제목, 부제목, 삭제, 링크, 위치, 북마크 정보 표시

"use client";

import { Query } from "@/entities/api/graphql";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFetchDeleteTravelProduct } from "../../travelWriter/api/useFetchDeleteTravelProduct";
import Bookmark from "./bookmark";

export default function ProductHeader({
  data,
}: {
  data: Pick<Query, "fetchTravelproduct"> | undefined;
}) {
  const { user } = useUserStore();
  const router = useRouter();

  const [deleteTravelProduct] = useFetchDeleteTravelProduct();

  const onClickDelete = async () => {
    try {
      await deleteTravelProduct({
        variables: {
          travelproductId: data?.fetchTravelproduct._id,
        },
      }).then(void router.push("/travel"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="flex flex-col gap-2 w-full max-[810px]:hidden px-5">
        {/* title, delete, link, location, bookmark */}
        <div className="flex justify-between items-center">
          {/* title */}
          <h1 className="font-bold text-[28px] truncate">
            {data?.fetchTravelproduct.name}
          </h1>
          <div className="flex justify-center items-center gap-4 ml-5">
            {/* delete */}
            {user?._id === data?.fetchTravelproduct.seller?._id ? (
              <button
                onClick={onClickDelete}
                className="flex justify-center items-center min-w-6"
              >
                <Image
                  src={"/travel/travel/travel-delete.svg"}
                  alt="delete"
                  width={15}
                  height={17}
                />
              </button>
            ) : (
              <></>
            )}
            {/* link */}
            <button className="flex justify-center items-center min-w-6">
              <Image
                src={"/travel/travel/travel-link.svg"}
                alt="link"
                width={19}
                height={9}
              />
            </button>
            {/* location */}
            <button className="flex justify-center items-center min-w-6">
              <Image
                src={"/travel/travel/travel-location.svg"}
                alt="location"
                width={15}
                height={18.5}
              />
            </button>

            {/* bookmark */}
            <Bookmark
              count={data?.fetchTravelproduct.pickedCount}
              travelId={data?.fetchTravelproduct._id}
            />
            {/* <div className="flex justify-center items-center gap-1 min-w-[53px] px-2 py-1 rounded-[8px] bg-black/40">
              <Image
                src={"/travel/travels/bookmark.svg"}
                alt="bookmark"
                width={16}
                height={20}
                className=""
              />
              <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
                {data?.fetchTravelproduct.pickedCount}
              </div>
            </div> */}
          </div>
        </div>

        {/* remarks */}
        <h2 className="font-medium text-[16px] text-gray-700">
          {data?.fetchTravelproduct.remarks}
        </h2>

        {/* tags */}
        <p className="font-medium text-[16px] text-[#2974E5]">
          {data?.fetchTravelproduct.tags?.join(" ")}
        </p>
      </header>
    </>
  );
}
