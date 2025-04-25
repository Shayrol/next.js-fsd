// 프로파일 모달의 포인트 충전 버튼이 달라 만듦.. (비효율적...)

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { requestPayment } from "../utils/requestPayment";
import { useCreatePointTransactionOfLoading } from "../api/useCreatePointTransactionOfLoading";
import { PointTransaction, User } from "@/entities/api/graphql";

interface IProps {
  setErrorOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function PointModalSelling({ setErrorOpen }: IProps) {
  const [open, setOpen] = useState(false); // 모달 열림 여부 제어
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { user, setUser } = useUserStore();

  const [createPointTransactionOfLoading, { data }] =
    useCreatePointTransactionOfLoading();

  const onClickCharge = async () => {
    setOpen(false);
    setErrorOpen?.(false);
    try {
      if (selectedValue) {
        const paymentId = await requestPayment(Number(selectedValue), user);
        const result = await createPointTransactionOfLoading({
          variables: { paymentId },
          update(cache, { data }) {
            cache.modify({
              fields: {
                fetchUserLoggedIn(existingUser = {}) {
                  const newPoint =
                    data?.createPointTransactionOfLoading.balance;

                  const updateUser = {
                    ...existingUser.userPoint,
                    amount: newPoint,
                  };
                  return updateUser;
                },
                // 전체 외 충전에서도 업데이트 되는지 확인하고 안되면 그냥 data 가져와 [data, ...existingData] 할 것
                fetchPointTransactions(existingData = {}) {
                  const newData: PointTransaction = {
                    createdAt: data?.createPointTransactionOfLoading.createdAt,
                    updatedAt: data?.createPointTransactionOfLoading.updatedAt,
                    _id: String(data?.createPointTransactionOfLoading._id),
                    status: String(
                      data?.createPointTransactionOfLoading.status
                    ),
                    statusDetail: String(
                      data?.createPointTransactionOfLoading.statusDetail
                    ),
                    balance: Number(
                      data?.createPointTransactionOfLoading.balance
                    ),
                    amount: Number(
                      data?.createPointTransactionOfLoading.amount
                    ),
                    impUid: data?.createPointTransactionOfLoading.impUid,
                    __typename: "PointTransaction",
                  };

                  return [newData, ...existingData];
                },
              },
            });
          },
        });
        console.log("result: ", result);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      }
    }
  };
  console.log("point modal user: ", user);
  console.log("point modal data: ", data);

  // 충전 후 zustand useUser 업데이트
  useEffect(() => {
    if (!data || !user) return;

    // 타입 문제로 User 타입 전부 업데이트 해줌
    const updatedUser: User = {
      ...user,
      userPoint: {
        _id: user.userPoint?._id ?? "",
        createdAt: user.userPoint?.createdAt ?? new Date().toISOString(),
        updatedAt: user.userPoint?.updatedAt ?? new Date().toISOString(),
        deletedAt: user.userPoint?.deletedAt ?? null,
        user: user.userPoint?.user ?? user,
        __typename: "UserPoint",
        amount: data.createPointTransactionOfLoading.balance,
      },
    };

    setUser(updatedUser);
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex gap-2 justify-center items-center px-3 py-2 min-w-[96px] max-w-[120px] w-full font-semibold text-sm text-white bg-[#2974E5] border border-[#2974E5] rounded-[8px]">
          충전
        </button>
      </DialogTrigger>
      <DialogContent className="w-[480px] max-sm:w-[320px] rounded-[8px]">
        <DialogHeader>
          {/* DialogTitle이 꼭 있어야 함 */}
          <DialogTitle></DialogTitle>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <Image
                src={"/mypage/point-charge.svg"}
                alt="charge"
                width={80}
                height={56}
              />
              <p className="font-semibold text-lg text-black">
                충전하실 금액을 선택해 주세요
              </p>

              {/* select option */}
              <Select onValueChange={(value) => setSelectedValue(value)}>
                <SelectTrigger className="flex justify-between items-center w-full">
                  <SelectValue placeholder="충전할 금액을 선택해 주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>충전할 금액을 선택해 주세요</SelectLabel> */}
                    <SelectItem value="1000">1,000</SelectItem>
                    <SelectItem value="5000">5,000</SelectItem>
                    <SelectItem value="10000">10,000</SelectItem>
                    <SelectItem value="20000">20,000</SelectItem>
                    <SelectItem value="50000">50,000</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* button */}
              <div className="flex justify-center items-center gap-3 w-full">
                <button
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center gap-2 w-full max-w-[120px] min-h-[40px] px-3 py-2 rounded-[8px] bg-white border border-black font-semibold text-sm text-black"
                >
                  취소
                </button>
                <button
                  onClick={onClickCharge}
                  className="flex justify-center items-center gap-2 w-full max-w-[120px] min-h-[40px] px-3 py-2 rounded-[8px] bg-[#2974E5] border border-[#2974E5] font-semibold text-sm text-white"
                >
                  충전하기
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
