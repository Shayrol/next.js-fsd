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
import { useFetchCreateTravelProduct } from "../api/useFetchCreateTravelProduct";
import { useRouter } from "next/navigation";
import KakaoMap from "@/shared/ui/kakao/kakaoMap/kakap-map";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// const KakaoMap = dynamic(() => import("@/shared/ui/kakao/kakaoMap/kakap-map"), {
//   ssr: false,
// });

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
  const router = useRouter();

  const [uploadFile] = useFetchUploadFile();
  const [createTravelProduct] = useFetchCreateTravelProduct();

  const {
    handleSubmit,
    register,
    reset,
    formState,
    setError,
    setValue,
    trigger,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(travelWriterSchema),
    defaultValues: {
      name: "",
      remark: "",
      contents: "",
      price: undefined,
    },
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

  // 등록
  const onClickSubmit = async (data: IForm) => {
    try {
      setIsSubmitting(true);

      const uploadImages = await processImages();

      await createTravelProduct({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remark,
            contents: data.contents,
            price: data.price,
            tags: tags,
            travelproductAddress: {
              zipcode: "",
              address: "",
              addressDetail: "",
            },
            images: uploadImages,
          },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchTravelproducts: (prev) => {
                return [data?.createTravelproduct, ...prev];
              },
            },
          });
        },
      });

      router.back();
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={
        !edit ? handleSubmit(onClickSubmit) : handleSubmit(onClickUpdate)
      }
      className="flex flex-col gap-10 w-full"
    >
      {/* 상품명 */}
      <div className="relative flex flex-col gap-2">
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
        {/* name error */}
        {formState.errors.name && (
          <p className="absolute bottom-[-20px] font-normal text-[13px] text-red-500">
            {formState.errors.name.message}
          </p>
        )}
      </div>

      {/* 한줄 요약 */}
      <div className="relative flex flex-col gap-2">
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
        {/* remark error */}
        {formState.errors.remark && (
          <p className="absolute bottom-[-20px] font-normal text-[13px] text-red-500">
            {formState.errors.remark.message}
          </p>
        )}
      </div>

      {/* 상품 설명 */}
      <div className="relative flex flex-col gap-2 mb-10">
        <p className="flex gap-1">
          상품 설명<span className="text-red-500">*</span>
        </p>
        <ReactQuill
          className="custom-quill"
          onChange={onChangeContents}
          placeholder="내용을 입력해 주세요."
        />
        {/* contents error */}
        {formState.errors.contents && (
          <p className="absolute bottom-[-65px] font-normal text-[13px] text-red-500">
            {formState.errors.contents.message}
          </p>
        )}
      </div>

      {/* 판매 가격 */}
      <div className="relative flex flex-col gap-2">
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
        {/* price error */}
        {formState.errors.price && (
          <p className="absolute bottom-[-20px] font-normal text-[13px] text-red-500">
            {formState.errors.price.message}
          </p>
        )}
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
      <div className="flex gap-10 w-full max-md:flex-col">
        <div className="flex flex-col gap-10 w-[396px] max-md:w-full">
          {/* 상세주소 */}
          <div className="flex flex-col gap-2 w-full">
            <p className="flex gap-1">
              주소<span className="text-red-500">*</span>
            </p>
            <div className="flex justify-start items-center gap-2">
              <input
                type="text"
                placeholder="01234"
                disabled={true}
                className="flex justify-center items-center px-4 py-3 border border-gray-200 rounded-[8px] w-[82px]"
              />
              <button className="flex justify-center items-center px-4 py-3 gap-2 border border-black bg-white font-semibold text-[18px] text-black rounded-[8px] text-nowrap">
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              placeholder="상세주소를 입력해 주세요."
              className="flex justify-center items-center px-4 py-3 border border-gray-200 rounded-[8px] w-full"
            />
          </div>

          {/* 위도 경도 */}
          <div className="flex flex-col gap-4 w-full">
            {/* 위도 */}
            <div className="flex flex-col gap-2">
              <p className="flex justify-start items-center gap-1 w-full font-medium text-[16px] text-black">
                위도(LAT)
              </p>
              <input
                type="text"
                disabled={true}
                placeholder="주소를 먼저 입력해 주세요."
                className="px-4 py-3 w-full bg-gray-100 font-normal text-[16px] text-gray-500 rounded-[8px]"
              />
            </div>
            {/* 경도 */}
            <div className="flex flex-col gap-2">
              <p className="flex justify-start items-center gap-1 w-full font-medium text-[16px] text-black">
                경도(LNG)
              </p>
              <input
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                disabled={true}
                className="px-4 py-3 w-full bg-gray-100 font-normal text-[16px] text-gray-500 rounded-[8px]"
              />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col gap-4 w-full">
          <p className="font-medium text-[16px] text-black">상세 위치</p>
          <div className="w-full h-full border border-gray-100 rounded-[16px] overflow-hidden max-md:aspect-[16/9]">
            <KakaoMap />
          </div>
        </div>
      </div>

      {/* 사진 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">사진 첨부</p>
        <ImageUploader
          initialImages={[]}
          onChange={handleImagesChange}
          disabled={isSubmitting}
        />
      </div>

      {/* 등록, 취소 */}
      <div className="flex justify-end items-center gap-4 w-full max-md:justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex justify-center items-center px-4 py-3 border border-black rounded-[8px] bg-white font-semibold text-[16px] max-md:w-full"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!formState.isValid}
          className={`flex justify-center items-center px-4 py-3 border font-semibold text-[16px] rounded-[8px] max-md:w-full
            ${
              formState.isValid
                ? " border-[#2974E5] bg-[#2974E5] text-white"
                : " border-gray-300 bg-gray-300 text-gray-100"
            }
          `}
        >
          등록하기
        </button>
      </div>
    </form>
  );
}

// 주소 추가하기 + 라이브러리
// 수정 api 연동 및 함수 생성
// 주소 register 추가 (수정시 기존 데이터 값 불러와 삽입하기 위함)
