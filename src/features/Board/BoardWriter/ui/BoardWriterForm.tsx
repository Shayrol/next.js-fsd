import ImageUploader from "./ImageSlot";

export default function BoardWriterForm() {
  return (
    <article className="flex flex-col gap-10 justify-center items-center w-full h-fit max-sm:gap-4">
      {/* 작성자 */}
      <section className="flex justify-center items-center gap-10 w-full max-sm:flex-col max-sm:gap-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="flex gap-1">
            작성자<span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="flex gap-1">
            비밀번호<span className="text-red-500">*</span>
          </p>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
          />
        </div>
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 제목 */}
      <section className="flex flex-col w-full gap-2">
        <p className="flex gap-1">
          제목<span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 내용 */}
      <section className="flex flex-col w-full gap-2">
        <p className="flex gap-1">
          내용<span className="text-red-500">*</span>
        </p>
        <textarea
          placeholder="내용을 입력해 주세요."
          className="w-full px-4 py-3 min-h-[336px] outline-none border border-gray-200 rounded-[8px] bg-white resize-none max-sm:min-h-[120px]"
        />
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 주소 */}
      <section className="flex flex-col w-full gap-2">
        <div className="flex flex-col gap-2 min-w-[220px]">
          <p className="flex gap-1">주소</p>
          <div className="flex gap-2">
            <input
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
          type="text"
          placeholder="주소를 입력해 주세요."
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
        <input
          type="text"
          placeholder="상세주소"
          className="flex gap-2 px-4 py-3 outline-none border border-gray-200 rounded-[8px] bg-white"
        />
      </section>
      <hr className="w-full border border-b-gray-100" />

      {/* 사진 */}
      <section className="flex flex-col gap-2 w-full max-sm:justify-center max-sm:items-center">
        <p className="flex justify-start w-full">사진 첨부</p>
        <ImageUploader />
      </section>

      {/* 등록, 취소 */}
      <section className="flex justify-end items-center gap-4 w-full h-fit">
        <button className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-white text-black font-semibold rounded-[8px] border border-black hover:bg-gray-100/90 max-sm:w-full">
          취소
        </button>
        <button className="flex justify-center items-center gap-2 w-fit min-h-[48px] px-4 py-3 bg-[#2974E5] text-white font-semibold rounded-[8px] border border-[#2974E5] hover:bg-[#2974E5]/90 max-sm:w-full">
          등록하기
        </button>
      </section>
    </article>
  );
}
