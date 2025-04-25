"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApolloClient } from "@apollo/client";
import { Dispatch, SetStateAction, useState } from "react";
import { useCreatePointTransactionOfBuyingAndSelling } from "../api/useCreatePointTransactionOfBuyingAndSelling";

import { useParams, useRouter } from "next/navigation";
import { FETCH_USER_LOGGED_IN } from "@/entities/api/auth/useFetchUserLoggedIn";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/entities/api/graphql";
import PointModalSelling from "@/widgets/layouts/Header/ui/point-modal-selling";

export default function BuyingButtonModal() {
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const router = useRouter();
  const [createPointTransactionOfBuyingAndSelling] =
    useCreatePointTransactionOfBuyingAndSelling();
  const client = useApolloClient();
  const { user, setUser } = useUserStore();

  const params = useParams();
  const travelId = params?.travelId;

  const onClickBuying = async () => {
    setOpen(false);
    try {
      const result = await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: travelId,
        },
        refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
        awaitRefetchQueries: true,
      });
      await client.clearStore();
      router.push("/travel");

      if (!result || !user) return;
      const updatedUser: User = {
        ...user,
        userPoint: {
          _id: user?.userPoint?._id ?? "", // 반드시 string
          createdAt: user?.userPoint?.createdAt ?? new Date().toISOString(),
          updatedAt: user?.userPoint?.updatedAt ?? new Date().toISOString(),
          deletedAt: user?.userPoint?.deletedAt ?? null,
          user: user?.userPoint?.user ?? user,
          __typename: "UserPoint",
          amount:
            (user?.userPoint?.amount ?? 0) -
            Number(result.data?.createPointTransactionOfBuyingAndSelling.price),
        },
      };

      setUser(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Buying and Selling API error: ", error.message);
        setErrorOpen(true);
      }
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex justify-center items-center gap-2 px-4 py-3 w-full rounded-[8px] font-semibold text-[20px] text-white bg-[#2974E5] hover:bg-[#2974E5]/90">
            구매하기
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="flex flex-col justify-center items-center gap-6 w-full">
              <header className="flex flex-col justify-center items-center gap-3 w-full">
                <p className="font-semibold text-lg text-black">
                  해당 숙박권을 구매 하시겠어요?
                </p>
                <p className="font-medium text-sm text-gray-800">
                  해당 숙박권은 포인트로만 구매 가능합니다.
                </p>
              </header>
              <div className="flex gap-3 justify-center items-center w-full">
                <button
                  onClick={() => setOpen(false)}
                  className="flex gap-2 justify-center items-center px-3 py-2 min-w-[96px] max-w-[120px] w-full font-semibold text-sm text-black bg-white border border-black rounded-[8px]"
                >
                  취소
                </button>
                <button
                  onClick={onClickBuying}
                  className="flex gap-2 justify-center items-center px-3 py-2 min-w-[96px] max-w-[120px] w-full font-semibold text-sm text-white bg-[#2974E5] border border-[#2974E5] rounded-[8px]"
                >
                  구매
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ErrorPointModal errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
    </>
  );
}

function ErrorPointModal({
  errorOpen,
  setErrorOpen,
}: {
  errorOpen: boolean;
  setErrorOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-black">
            포인트가 부족합니다.
          </DialogTitle>
          <div className="flex flex-col justify-center items-center gap-6 w-full mt-4">
            <p className="text-gray-800 text-sm text-center">
              포인트가 부족하여 해당 숙박권을 구매할 수 없습니다.
              <br />
              포인트를 충전하시겠어요?
            </p>
            <div className="flex gap-3 justify-center items-center w-full">
              <button
                onClick={() => setErrorOpen(false)}
                className="flex gap-2 justify-center items-center px-3 py-2 min-w-[96px] max-w-[120px] w-full font-semibold text-sm text-black bg-white border border-black rounded-[8px]"
              >
                취소
              </button>
              <PointModalSelling setErrorOpen={setErrorOpen} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
