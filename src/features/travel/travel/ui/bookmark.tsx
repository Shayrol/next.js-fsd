"use client";

import Image from "next/image";
import { useToggleTravelProductPick } from "../api/useToggleTravelProductPick";
import { gql } from "@apollo/client";

export default function Bookmark({
  count,
  travelId,
}: {
  count: number | undefined | null;
  travelId: string | undefined | null;
}) {
  const [toggleTravelProduct] = useToggleTravelProductPick();

  const onClickBookmark = async () => {
    try {
      await toggleTravelProduct({
        variables: {
          travelproductId: travelId,
        },

        update: (cache, { data }) => {
          const newCount = data?.toggleTravelproductPick;

          const id = cache.identify({
            __typename: "Travelproduct",
            _id: travelId,
          });

          // 캐시에 있는 Travelproduct 객체 읽어오기
          const travelProductFragment = cache.readFragment({
            id,
            fragment: gql`
              fragment TravelProductFields on Travelproduct {
                _id
                name
                pickedCount
              }
            `,
          });

          cache.modify({
            id,
            fields: {
              pickedCount() {
                return newCount;
              },
            },
          });

          cache.modify({
            fields: {
              fetchTravelproductsIPicked(
                existingRefs: readonly any[] = [],
                { readField }
              ) {
                const isAlreadyPicked = existingRefs.some(
                  (ref) => readField("_id", ref) === travelId
                );

                if (isAlreadyPicked) {
                  // 제거
                  return existingRefs.filter(
                    (ref) => readField("_id", ref) !== travelId
                  );
                } else {
                  // 추가
                  return existingRefs.concat(travelProductFragment);
                }
              },
            },
          });
        },

        // update: (cache, { data }) => {
        //   const newCount = data?.toggleTravelproductPick;

        //   const id = cache.identify({
        //     __typename: "Travelproduct",
        //     _id: travelId,
        //   });

        //   cache.modify({
        //     id,
        //     fields: {
        //       pickedCount() {
        //         return newCount;
        //       },
        //       fetchTravelproductsIPicked() {

        //       },
        //     },
        //   });
        // },

        // update: (cache, { data }) => {
        //   cache.modify({
        //     fields: {
        //       fetchTravelproduct(existingData = {}) {
        //         const newCount = data?.toggleTravelproductPick;
        //         return {
        //           ...existingData,
        //           pickedCount: newCount,
        //         };
        //       },
        //     },
        //   });
        // },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={onClickBookmark}
      className="flex justify-center items-center gap-1 min-w-[53px] px-2 py-1 rounded-[8px] bg-black/40"
    >
      <Image
        src={"/travel/travels/bookmark.svg"}
        alt="bookmark"
        width={16}
        height={20}
        className=""
      />
      <div className="w-[17px] h-[20px] flex justify-center items-center text-white shadow-md text-[14px] font-medium leading-[20px] tracking-[0%] rounded">
        {count}
      </div>
    </button>
  );
}
