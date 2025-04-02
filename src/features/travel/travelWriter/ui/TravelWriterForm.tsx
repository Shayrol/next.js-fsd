"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { travelWriterSchema } from "../api/schema";
import "./quillStyles.css";
import { useState } from "react";
import {
  ImageType,
  ImageUploader,
} from "@/shared/ui/ImageUploader/ImageUploader";
import { useFetchUploadFile } from "@/shared/api/useFetchUploadFile";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface IProps {
  edit: boolean;
  // data?: Pick<Query, "fetchBoard"> | undefined;
}

interface IForm {
  name: string;
  remark: string;
  contents: string;
  price: number;
}

export default function TravelWriterForm({ edit }: IProps) {
  const [uploadFile] = useFetchUploadFile();

  const {
    handleSubmit,
    register,
    reset,
    formState,
    setError,
    setValue,
    trigger,
  } = useForm<IForm>({
    resolver: yupResolver(travelWriterSchema),
  });

  // 이미지
  const [images, setImages] = useState<ImageType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImagesChange = (updatedImages: ImageType[]) => {
    setImages(updatedImages);
  };

  const processImages = async () => {
    // 1. 새로 추가된 이미지 파일 수집
    const newImageFiles = images
      .filter((img) => img.isNew && !img.isDeleted && img.file)
      .map((img) => img.file as File);

    // 2. 유지할 기존 이미지 URL 수집
    const keptImageUrls = images
      .filter((img) => !img.isNew && !img.isDeleted)
      .map((img) =>
        img.url.startsWith("http://storage.googleapis.com/")
          ? img.url.replace("http://storage.googleapis.com/", "")
          : img.url
      );

    // 3. 새 이미지 업로드 및 URL 가져오기
    const uploadResults = await Promise.all(
      newImageFiles.map(async (file) => {
        const result = await uploadFile({ variables: { file } });
        return result.data?.uploadFile.url ?? "";
      })
    );

    console.log("files: ", uploadResults);

    // 4. 기존 이미지와 새 이미지 URL 합치기
    const allImageUrls = [...keptImageUrls, ...uploadResults];

    console.log("allImageUrls: ", allImageUrls);
    return allImageUrls;
  };

  // 내용
  const onChangeContents = (value: string) => {
    // register를 사용하지 못해 강제로 값 넣기
    setValue("contents", value);
    trigger("contents"); // 에러처리을 하기 위함
  };

  // 등록
  const onClickSubmit = (data: IForm) => {
    console.log("form: ", data);
  };

  // 태그
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <form
      onSubmit={
        !edit ? handleSubmit(onClickSubmit) : handleSubmit(onClickUpdate)
      }
      className="flex flex-col gap-10 w-full"
    >
      {/* 상품명 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">
          상품명<span className="text-red-500">*</span>
        </p>
        <input
          {...register("name")}
          type="text"
          placeholder="상품명을 입력해 주세요."
          // defaultValue={!edit ? "" : String(data?.fetchBoard.writer)}
          disabled={!edit ? false : true}
          className={`flex gap-2 px-4 py-3 w-full outline-none border border-gray-200 rounded-[8px]
                ${!edit ? "bg-white" : "bg-gray-200"}
              `}
        />
      </div>

      {/* 한줄 요약 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">
          한줄 요약<span className="text-red-500">*</span>
        </p>
        <input
          {...register("remark")}
          type="text"
          placeholder="상품을 한줄로 요약해 주세요."
          // defaultValue={!edit ? "" : String(data?.fetchBoard.writer)}
          disabled={!edit ? false : true}
          className={`flex gap-2 px-4 py-3 w-full outline-none border border-gray-200 rounded-[8px]
                ${!edit ? "bg-white" : "bg-gray-200"}
              `}
        />
      </div>

      {/* 상품 설명 */}
      <div className="flex flex-col gap-2 mb-10">
        <p className="flex gap-1">
          상품 설명<span className="text-red-500">*</span>
        </p>
        <ReactQuill
          className="custom-quill"
          onChange={onChangeContents}
          placeholder="내용을 입력해 주세요."
        />
      </div>

      {/* 판매 가격 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">
          판매 가격<span className="text-red-500">*</span>
        </p>
        <input
          {...register("price")}
          type="text"
          placeholder="판매 가격을 입력해 주세요. (원 단위)"
          // defaultValue={!edit ? "" : String(data?.fetchBoard.writer)}
          disabled={!edit ? false : true}
          className={`flex gap-2 px-4 py-3 w-full outline-none border border-gray-200 rounded-[8px]
                ${!edit ? "bg-white" : "bg-gray-200"}
              `}
        />
      </div>

      {/* 태그 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">태그 입력</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-1 rounded-md text-sm"
            >
              {tag} <button onClick={() => removeTag(tag)}>×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그를 입력해 주세요."
          // defaultValue={!edit ? "" : String(data?.fetchBoard.writer)}
          className={`flex gap-2 px-4 py-3 w-full outline-none border border-gray-200 rounded-[8px]
                ${!edit ? "bg-white" : "bg-gray-200"}
              `}
        />
      </div>

      {/* 주소 */}

      {/* 사진 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">사진 첨부</p>
        <ImageUploader
          initialImages={[]}
          onChange={handleImagesChange}
          disabled={isSubmitting}
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
}

// 주소 추가하기 + 라이브러리
// 등록 취소 추가
// 등록, 수정 api 연동 및 함수 생성
