"use client";

import { boardWriterSchema } from "../api/schema";
import { useFetchCreateBoard } from "../api/useFetchCreateBoard";
import ImageUploader from "./ImageSlot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export interface IForm {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  youtubeUrl: string;
  image?: (File | null)[];
}

export default function BoardWriterForm() {
  const router = useRouter();
  const { handleSubmit, register, formState, setValue } = useForm<IForm>({
    resolver: yupResolver(boardWriterSchema),
  });

  const [createBoard] = useFetchCreateBoard();

  const onClickSubmit = async (data: IForm) => {
    console.log("dataImageddddddd", data.image);
    try {
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
            images: data.image,
          },
        },
        // refetchQueries: [{ query: BOARDS }],  // 서버컴포넌트에서 업데이트를 하고 있어 반영안됨.
      });
      alert("게시물이 등록되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
    }
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
        <ImageUploader setValue={setValue} />
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

// 일단 resolvers에 타입 에러가 있지만 seValue의 이미지를 잘 가져오고 있고
// 문제 없이 동작은 하고 있음
// 여기서 게시물 등록을 이미지를 먼저 Storage에 업로드하고 반환 값을 넣어 저장을 해야
// 에러가 없음(이미지 타입에러인 듯)

// 그래서 우선 <ImageUploader setValue={setValue} />의 이미지 state를 props로 넘겨줘
// 부모에서 관리하고 useForm을 사용하는 방식을 적용해보기
// 또는 이미지 저장 API의 반환 값 가져와 이미지 타입 변경해서 resolvers 타입에러 확인하기

// setValue도 Props 문제 없으니 작성자, 제목, 내용 등 모듈화로 분리해서 관리하기
