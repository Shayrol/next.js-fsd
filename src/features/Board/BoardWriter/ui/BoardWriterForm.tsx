"use client";

import { boardWriterSchema } from "../api/schema";
import { useFetchCreateBoard } from "../api/useFetchCreateBoard";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchUploadFile } from "@/shared/api/useFetchUploadFile";
import { useEffect, useState } from "react";
import { useFetchUpdateBoard } from "../api/useFetchUpdateBoard";
import {
  ImageType,
  ImageUploader,
} from "@/shared/ui/ImageUploader/ImageUploader";
import { Query } from "@/entities/api/graphql";

export interface IForm {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  youtubeUrl?: string;
}

interface IProps {
  edit: boolean;
  data?: Pick<Query, "fetchBoard"> | undefined;
}

export default function BoardWriterForm({ edit, data }: IProps) {
  const params = useParams();
  const boardId = String(params?.boardId);
  const router = useRouter();

  // 이미지 상태 관리 📕
  const [images, setImages] = useState<ImageType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, register, reset, formState, setError } = useForm<IForm>(
    {
      resolver: yupResolver(boardWriterSchema),
      defaultValues: {
        writer: "",
        password: "",
        title: "",
        contents: "",
        youtubeUrl: "",
      },
    }
  );

  const [createBoard] = useFetchCreateBoard();
  const [uploadFile] = useFetchUploadFile();
  const [updateBoard] = useFetchUpdateBoard();

  // 수정 시 Form의 초기 값 불러오기
  useEffect(() => {
    if (data) {
      reset({
        writer: data.fetchBoard.writer ?? "",
        password: "",
        title: data.fetchBoard.title ?? "",
        contents: data.fetchBoard.contents ?? "",
        youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
      });
    }
  }, [data, reset]);

  // 이미지 변경 처리 📕
  const handleImagesChange = (updatedImages: ImageType[]) => {
    setImages(updatedImages);
  };

  // 이미지 업로드 및 URL 가져오기 📕
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

  const onClickSubmit = async (data: IForm) => {
    try {
      setIsSubmitting(true);

      // 이미지 처리 📕
      const uploadImages = await processImages();

      // 게시글 생성
      await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
            youtubeUrl: data.youtubeUrl,
            boardAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
            },
            images: uploadImages,
          },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoards: (prev) => {
                return [data?.createBoard, ...prev];
              },
              fetchBoardsCount: (prev) => {
                return prev + 1;
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

  const onClickUpdate = async (data: IForm) => {
    try {
      setIsSubmitting(true);

      // 이미지 처리 📕
      const uploadImages = await processImages();
      // 게시글 수정
      await updateBoard({
        variables: {
          updateBoardInput: {
            title: data.title,
            contents: data.contents,
            youtubeUrl: data.youtubeUrl,
            images: uploadImages,
          },
          password: data.password,
          boardId,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoard: () => {
                return data?.updateBoard;
              },
            },
          });
        },
      });

      router.push(`/board/${boardId}`);
    } catch (error) {
      if (error instanceof Error) {
        setError("password", {
          type: "manual",
          message: "비밀번호가 일치하지 않습니다.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={
        !edit ? handleSubmit(onClickSubmit) : handleSubmit(onClickUpdate)
      }
      className="flex flex-col gap-10 justify-center items-center w-full h-fit max-sm:gap-4"
    >
      {/* 작성자 */}
      <section className="flex justify-center items-center gap-10 w-full max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-col gap-2 w-full relative">
          <p className="flex gap-1">
            작성자<span className="text-red-500">*</span>
          </p>
          <input
            {...register("writer")}
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            defaultValue={!edit ? "" : String(data?.fetchBoard.writer)}
            disabled={!edit ? false : true}
            className={`flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px]
                ${!edit ? "bg-white" : "bg-gray-200"}
              `}
          />
          <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
            {formState.errors.writer?.message}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full relative">
          <p className="flex gap-1">
            비밀번호<span className="text-red-500">*</span>
          </p>
          <input
            {...register("password")}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
          />
          <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
            {formState.errors.password?.message}
          </p>
        </div>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 제목 */}
      <section className="flex flex-col w-full gap-2 relative">
        <p className="flex gap-1">
          제목<span className="text-red-500">*</span>
        </p>
        <input
          {...register("title")}
          type="text"
          placeholder="제목을 입력해 주세요."
          defaultValue={!edit ? "" : String(data?.fetchBoard.title)}
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
        <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
          {formState.errors.title?.message}
        </p>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 내용 */}
      <section className="flex flex-col w-full gap-2 relative">
        <p className="flex gap-1">
          내용<span className="text-red-500">*</span>
        </p>
        <textarea
          {...register("contents")}
          placeholder="내용을 입력해 주세요."
          defaultValue={!edit ? "" : String(data?.fetchBoard.contents)}
          className="w-full px-4 py-3 min-h-[336px] outline-none border border-gray-200 rounded-[8px] bg-white resize-none max-sm:min-h-[120px]"
        />
        <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
          {formState.errors.contents?.message}
        </p>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 유튜브 */}
      <section className="flex flex-col w-full gap-2 relative">
        <p className="flex gap-1">유튜브 링크</p>
        <input
          {...register("youtubeUrl")}
          type="text"
          placeholder="링크를 입력해 주세요."
          defaultValue={!edit ? "" : String(data?.fetchBoard.youtubeUrl)}
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
        <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
          {formState.errors.youtubeUrl?.message}
        </p>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 사진 */}
      <section className="flex flex-col gap-2 w-full max-sm:justify-center max-sm:items-center">
        <p className="flex justify-start w-full">사진 첨부</p>
        <div className="flex justify-start items-center w-full">
          {/* 이미지 업로더 📕 */}
          <ImageUploader
            initialImages={data?.fetchBoard.images || []}
            onChange={handleImagesChange}
            disabled={isSubmitting}
          />
        </div>
      </section>

      {/* 등록, 취소 */}
      <section className="flex justify-end items-center gap-4 w-full h-fit">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-white text-black font-semibold rounded-[8px] border border-black hover:bg-gray-100/90 max-sm:w-full"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-[#2974E5] text-white font-semibold rounded-[8px] border border-[#2974E5] hover:bg-[#2974E5]/90 max-sm:w-full"
        >
          {isSubmitting ? "처리 중..." : edit ? "수정하기" : "등록하기"}
        </button>
      </section>
    </form>
  );
}

// board skeleton ui 생성하기
// 로그인 처리
// 숙박권 구매
