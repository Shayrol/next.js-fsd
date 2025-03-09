"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IForm } from "./BoardWriterForm";

// 단일 이미지 슬롯 컴포넌트
function ImageSlot({
  id,
  file,
  setImageFile,
}: {
  id: number;
  file: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<(File | null)[]>>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  // 파일 선택 시 미리보기 생성
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    if (file) {
      setImageFile((prev) => {
        const newFiles = [...prev];
        newFiles[id] = file;
        return newFiles;
      });
    }
    e.target.value = "";
  };

  // 이미지 제거
  const handleRemove = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageFile((prev) => {
      const newFiles = [...prev];
      newFiles[id] = null;
      return newFiles;
    });
  };

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
          htmlFor={`file-upload-${id}`}
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
        id={`file-upload-${id}`}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}

interface IImageUploader {
  setValue: UseFormSetValue<IForm>;
}

// 상위 컴포넌트
export default function ImageUploader(props: IImageUploader) {
  const { setValue } = props;
  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  useEffect(() => {
    setValue("image", imageFile); // 폼 필드 "image"에 imageFile 반영
  }, [imageFile]);

  return (
    <div className="flex justify-start items-center w-fit gap-4 max-sm:w-full max-sm:justify-center">
      {imageFile.map((file, index) => (
        <ImageSlot
          key={index}
          id={index}
          file={file}
          setImageFile={setImageFile}
        />
      ))}
    </div>
  );
}
