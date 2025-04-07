"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { travelWriterSchema } from "../api/schema";
import "./quillStyles.css";
import { useEffect, useState } from "react";
import {
  ImageType,
  ImageUploader,
} from "@/shared/ui/ImageUploader/ImageUploader";
import { useFetchUploadFile } from "@/shared/api/useFetchUploadFile";
import { useFetchCreateTravelProduct } from "../api/useFetchCreateTravelProduct";
import { useParams, useRouter } from "next/navigation";
import KakaoMap from "@/shared/ui/kakao/kakaoMap/kakap-map";
import PostcodeModal from "./postcode-modal";
import { Query } from "@/entities/api/graphql";
import { useFetchUpdateTravelProduct } from "../api/useFetchUpdateTravelProduct";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// const KakaoMap = dynamic(() => import("@/shared/ui/kakao/kakaoMap/kakap-map"), {
//   ssr: false,
// });

interface IProps {
  edit: boolean;
  data?: Pick<Query, "fetchTravelproduct"> | undefined;
}

interface IForm {
  name: string;
  remark: string;
  contents: string;
  price: number;
  zonecode: string;
  addressDetail: string;
  lat: number;
  lng: number;
}

export default function TravelWriterForm({ edit, data }: IProps) {
  const params = useParams();
  const travelproductId = String(params?.travelId);
  const router = useRouter();

  const [uploadFile] = useFetchUploadFile();
  const [createTravelProduct] = useFetchCreateTravelProduct();
  const [updateTravelProduct] = useFetchUpdateTravelProduct();

  const { handleSubmit, register, reset, formState, setValue, trigger, watch } =
    useForm<IForm>({
      mode: "onChange",
      resolver: yupResolver(travelWriterSchema),
      defaultValues: {
        name: "",
        remark: "",
        contents: "",
        price: undefined,
        zonecode: "",
        addressDetail: "",
        lat: undefined,
        lng: undefined,
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

  // tags의 state의 초기 값으로 해당 data를 넣었지만 새로고침으로 값을 불러오지 못함
  // data를 불러오는 중으로 생긴 문제로 생각함 (SSR이 아닌 CSR로 데이터를 불러오고 있음..)
  useEffect(() => {
    if (data?.fetchTravelproduct?.tags) {
      setTags(data.fetchTravelproduct.tags);
    }
  }, [data]);

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

  // 주소
  const latitude = watch("lat");
  const longitude = watch("lng");

  // 등록
  const onClickSubmit = async (data: IForm) => {
    console.log("data: ", data);
    try {
      setIsSubmitting(true);

      const uploadImages = await processImages();

      const result = await createTravelProduct({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remark,
            contents: data.contents,
            price: data.price,
            tags: tags,
            travelproductAddress: {
              zipcode: data.zonecode,
              address: "",
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
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

      router.push(`/travel/${result.data?.createTravelproduct._id}`);
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 수정
  const onClickUpdate = async (data: IForm) => {
    try {
      setIsSubmitting(true);

      const uploadImages = await processImages();

      const result = await updateTravelProduct({
        variables: {
          updateTravelproductInput: {
            name: data.name,
            remarks: data.remark,
            contents: data.contents,
            price: data.price,
            tags: tags,
            travelproductAddress: {
              zipcode: data.zonecode,
              address: "",
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
            },
            images: uploadImages,
          },
          travelproductId,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchTravelproduct: () => {
                return [data?.updateTravelproduct];
              },
            },
          });
        },
      });

      router.push(`/travel/${result.data?.updateTravelproduct._id}`);
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 수정 시 Form의 초기 값 불러오기
  useEffect(() => {
    if (data) {
      reset({
        name: data.fetchTravelproduct.name ?? "",
        remark: data.fetchTravelproduct.remarks ?? "",
        contents: data.fetchTravelproduct.contents ?? "",
        price: data.fetchTravelproduct.price ?? undefined,
        zonecode: data.fetchTravelproduct.travelproductAddress?.zipcode ?? "",
        addressDetail:
          data.fetchTravelproduct.travelproductAddress?.addressDetail ?? "",
        lat: data.fetchTravelproduct.travelproductAddress?.lat ?? undefined,
        lng: data.fetchTravelproduct.travelproductAddress?.lng ?? undefined,
      });
    }
  }, [data, reset]);

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
          value={!edit ? "" : watch("contents")}
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
                {...register("zonecode")}
                type="text"
                placeholder="01234"
                // value={zonecode}
                disabled={true}
                className="flex justify-center items-center px-4 py-3 border border-gray-200 rounded-[8px] w-[82px]"
              />
              <PostcodeModal setValue={setValue} />
            </div>
            <input
              {...register("addressDetail")}
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
                {...register("lat")}
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                // value={latitude}
                disabled={true}
                className="px-4 py-3 w-full bg-gray-100 font-normal text-[16px] text-gray-500 rounded-[8px]"
              />
            </div>
            {/* 경도 */}
            <div className="flex flex-col gap-2">
              <p className="flex justify-start items-center gap-1 w-full font-medium text-[16px] text-black">
                경도(LNG)
              </p>
              <input
                {...register("lng")}
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                // value={longitude}
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
            {latitude && longitude ? (
              <KakaoMap
                latitude={latitude}
                longitude={longitude}
                title={
                  data?.fetchTravelproduct.travelproductAddress
                    ?.addressDetail ?? ""
                }
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-gray-100 font-medium text-[14px] text-gray-600">
                주소를 먼저 입력해 주세요.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 사진 */}
      <div className="flex flex-col gap-2">
        <p className="flex gap-1">사진 첨부</p>
        <ImageUploader
          initialImages={data?.fetchTravelproduct.images || []}
          onChange={handleImagesChange}
          disabled={isSubmitting}
        />
      </div>

      {/* 등록, 취소 */}
      <div className="flex justify-end items-center gap-4 w-full max-md:justify-center">
        <button
          type="button"
          onClick={() => router.push("/travel")}
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
          {!edit ? "등록하기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}

// 1. 지도 마커 표시
// 2. 수정하기 적용 - 구매하기 대신 수정하기 버튼 추가
// 3. 본인 게시글 삭제 기능 추가
// 4. travel 댓글 추가
// 5. 구매 기능 추가 - 포트원
