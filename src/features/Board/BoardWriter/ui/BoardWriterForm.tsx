"use client";

import { boardWriterSchema } from "../api/schema";
import { useFetchCreateBoard } from "../api/useFetchCreateBoard";
import ImageUploader from "./ImageSlot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchUploadFile } from "@/shared/api/useFetchUploadFile";
import { useState } from "react";

export interface IForm {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  youtubeUrl?: string;
  // image?: (File | null)[];
}

export default function BoardWriterForm() {
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm<IForm>({
    resolver: yupResolver(boardWriterSchema),
  });

  const [imageFile, setImageFile] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);

  const [createBoard] = useFetchCreateBoard();
  const [uploadFile] = useFetchUploadFile();

  const onClickSubmit = async (data: IForm) => {
    const resultImages = await Promise.all(
      imageFile.map(async (el) => {
        if (el) {
          const result = await uploadFile({ variables: { file: el } });
          return result.data?.uploadFile.url ?? "";
        } else {
          return "";
        }
      })
    );

    console.log("resultImages", resultImages);

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
          images: resultImages,
        },
      },
    }).then(() => router.push("/"));
  };

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
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
            className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
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
          className="w-full px-4 py-3 min-h-[336px] outline-none border border-gray-200 rounded-[8px] bg-white resize-none max-sm:min-h-[120px]"
        />
        <p className="text-[12px] text-red-500 absolute bottom-[-20px] right-1">
          {formState.errors.contents?.message}
        </p>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 주소 */}
      <section className="flex flex-col w-full gap-2">
        <div className="flex flex-col gap-2 min-w-[220px]">
          <p className="flex gap-1">주소</p>
          <div className="flex gap-2">
            <input
              {...register("zipcode")}
              type="text"
              readOnly
              placeholder="01234"
              className="px-4 py-3 w-[82px] outline-none border border-gray-200 rounded-[8px] bg-white"
            />
            <button className="flex justify-center items-center gap-2 w-[130px] min-h-[48px] px-4 py-3 border border-black rounded-[8px] text-nowrap font-semibold">
              우편번호 검색
            </button>
          </div>
        </div>

        <input
          {...register("address")}
          type="text"
          placeholder="주소를 입력해 주세요."
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
        <input
          {...register("addressDetail")}
          type="text"
          placeholder="상세주소"
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 유튜브 */}
      <section className="flex flex-col w-full gap-2 relative">
        <p className="flex gap-1">유튜브 링크</p>
        <input
          {...register("youtubeUrl")}
          type="text"
          placeholder="링크를 입력해 주세요."
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
        <ImageUploader ImageFileState={{ imageFile, setImageFile }} />
      </section>

      {/* 등록, 취소 */}
      <section className="flex justify-end items-center gap-4 w-full h-fit">
        <button className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-white text-black font-semibold rounded-[8px] border border-black hover:bg-gray-100/90 max-sm:w-full">
          취소
        </button>
        <button
          type="submit"
          className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-[#2974E5] text-white font-semibold rounded-[8px] border border-[#2974E5] hover:bg-[#2974E5]/90 max-sm:w-full"
        >
          등록하기
        </button>
      </section>
    </form>
  );
}
