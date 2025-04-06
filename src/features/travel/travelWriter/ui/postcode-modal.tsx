"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getCoordsByAddress } from "../hook/getCoordsByAddress";

interface IForm {
  name: string;
  remark: string;
  contents: string;
  price: number;
  zonecode: string;
  addressDetail: string;
  lat: string;
  lng: string;
}

interface IProps {
  setValue: UseFormSetValue<IForm>;
}

export default function PostcodeModal({ setValue }: IProps) {
  const [open, setOpen] = useState(false); // 모달 열림 여부 제어

  const handleComplete = async (data: any) => {
    const address = data.roadAddress;

    try {
      console.log("선택된 주소:", data);
      setValue("zonecode", data.zonecode); // 선택된 우편번호 설정

      const coords = await getCoordsByAddress(address); // 주소로 좌표 가져오기
      setValue("lat", coords.latitude); // 위도 설정
      setValue("lng", coords.longitude); // 경도 설정
      console.log("좌표:", coords); // 좌표 확인
    } catch (error) {
      console.error("좌표 가져오기 실패:", error);
    } finally {
      setOpen(false); // 주소 선택 후 모달 닫기
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className="flex justify-center items-center px-4 py-3 gap-2 border border-black bg-white font-semibold text-[18px] text-black rounded-[8px] text-nowrap cursor-pointer"
        >
          우편번호 검색
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <DaumPostcodeEmbed
              onComplete={handleComplete}
              style={{ height: "500px" }}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
