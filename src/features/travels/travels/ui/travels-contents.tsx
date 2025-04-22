import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useFetchTravelProducts } from "../api/useFetchTravelProducts";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function TravelsContents() {
  const searchParams = useSearchParams();

  const isSoldout =
    searchParams?.get("availability") === "closed" ? true : false;
  const search = searchParams?.get("search") ? searchParams.get("search") : "";
  // const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;

  const { data, fetchMore } = useFetchTravelProducts({
    isSoldout,
    search,
    page: 1,
  });
  const [hasMore, setHasMore] = useState(true);

  console.log("travels: ", data?.fetchTravelproducts.length);
  const count = data?.fetchTravelproducts.length ?? 10;

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        isSoldout,
        search,
        page: Math.ceil(count / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproducts) {
          setHasMore(false);
          return prev;
        }

        const newItems = fetchMoreResult.fetchTravelproducts.filter(
          (newItem) =>
            !prev.fetchTravelproducts.some((item) => item._id === newItem._id)
        );

        return {
          fetchTravelproducts: [...prev.fetchTravelproducts, ...newItems],
        };
      },
    });
  };

  return (
    <InfiniteScroll
      next={onNext}
      hasMore={hasMore}
      loader={<></>}
      dataLength={data?.fetchTravelproducts.length ?? 0}
    >
      {data && data?.fetchTravelproducts.length > 0 ? (
        <ul className="grid grid-cols-4 w-full max-w-[1280px] gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {data.fetchTravelproducts.map((el) => (
            <Link href={`travel/${el._id}`} key={el._id}>
              <li key={el._id} className="flex flex-col gap-3 w-full">
                <div className="relative flex justify-center items-center w-full h-[296px]">
                  <Image
                    src={
                      el.images?.length !== 0
                        ? `https://storage.googleapis.com/${el.images?.[0]}`
                        : "/not-images/not-image.svg"
                    }
                    alt="travel-image"
                    fill
                    className="object-cover rounded-[16px]"
                  />
                  <div className="absolute top-4 right-4 flex justify-center items-center gap-1 px-2 py-1 rounded-[8px] bg-black/40">
                    <Image
                      src={"/travel/travels/bookmark.svg"}
                      alt="bookmark"
                      width={16}
                      height={20}
                      className=""
                    />
                    <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
                      {el.pickedCount}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-col w-full gap-1 ">
                    <h1 className="truncate font-semibold text-gray-800 text-[16px]">
                      {el.name}
                    </h1>
                    <h2 className="truncate font-normal text-gray-600 text-[14px]">
                      {el.remarks}
                    </h2>
                  </div>
                  {/* tag, profile */}
                  <div className="flex flex-col w-full gap-3">
                    <p className="flex gap-2 w-full min-h-[24px] text-[#2974E5]">
                      {el.tags?.join(" ")}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        <div className="relative border rounded-full w-[24px] h-[24px]">
                          <Image
                            src={
                              el.seller?.picture !== null
                                ? `https://storage.googleapis.com/${el.seller?.picture}`
                                : "/not-images/not-profile.svg"
                            }
                            alt="profile-image"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-light text-gray-700">
                          {el.seller?.name}
                        </p>
                      </div>
                      <p className="font-semibold text-[18px]">
                        {el.price?.toLocaleString()} 원
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center px-6 py-12 w-full text-[18px] font-medium">
          검색된 내용이 없습니다.
        </div>
      )}
    </InfiniteScroll>
  );
}
