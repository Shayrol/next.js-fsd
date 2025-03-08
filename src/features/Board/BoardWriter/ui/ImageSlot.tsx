"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

// 단일 이미지 슬롯 컴포넌트
function ImageSlot({
  id,
  imageFile,
  setImageFile,
}: {
  id: string;
  imageFile: File[];
  setImageFile: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log("imageUrl: ", imageFile);
  console.log("imageUrl: ", imageUrl);

  // 파일 선택 시 미리보기 생성
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // 배열에서 해당 id 인덱스에 파일 저장
      setImageFile((prev) => {
        const newFiles = [...prev];
        newFiles[Number(id)] = file;
        return newFiles;
      });
    }
    e.target.value = "";
  };

  // 이미지 제거
  const handleRemove = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl); // 메모리 누수 방지
    }
    setImageUrl(null);

    // 배열에서 해당 id의 이미지 제거
    setImageFile((prev) => {
      const newFiles = [...prev];
      newFiles[Number(id)] = undefined as unknown as File; // undefined 대신 빈 파일로 채움
      return newFiles;
    });
  };

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex justify-center items-center gap-2 w-[160px] h-auto">
      {imageUrl ? (
        <div
          className="flex flex-col justify-center items-center relative gap-2 w-full 
          max-sm:w-full max-sm:h-auto aspect-[1/1] rounded-[8px] border border-gray-200"
        >
          <Image src={imageUrl} alt="미리보기" fill className="rounded-[8px]" />
          <Image
            src={"/board/board-write/close-btn.svg"}
            alt="close-btn"
            width={24}
            height={24}
            onClick={handleRemove}
            className="absolute right-[10px] top-[10px] z-20 cursor-pointer"
          />
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex flex-col justify-center items-center relative gap-2 w-[160px] 
            h-[160px] max-sm:w-full max-sm:h-auto aspect-[1/1] rounded-[8px]
            bg-[#F2F2F2] cursor-pointer border border-gray-200"
        >
          <Image
            src={"/board/board-write/image-add.svg"}
            alt="image-add"
            width={24}
            height={24}
          />
          <p className="font-normal text-[#777777] text-nowrap max-sm:hidden">
            클릭해서 사진 업로드
          </p>
        </label>
      )}
      <input
        type="file"
        id={id}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" // 이미지 파일만 선택 가능
      />
    </div>
  );
}

// 상위 컴포넌트에서 세 개의 슬롯 사용
export default function ImageUploader() {
  const [imageFile, setImageFile] = useState<File[]>([]);

  return (
    <div className="flex justify-start items-center w-fit gap-4 max-sm:w-full max-sm:justify-center">
      <ImageSlot id="0" imageFile={imageFile} setImageFile={setImageFile} />
      <ImageSlot id="1" imageFile={imageFile} setImageFile={setImageFile} />
      <ImageSlot id="2" imageFile={imageFile} setImageFile={setImageFile} />
    </div>
  );
}
