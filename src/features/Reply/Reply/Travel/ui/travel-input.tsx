// 댓글 입력

import { useFetchCreateTravelProductQuestion } from "../api/useFetchCreateTravelProductQuestion";

export default function TravelInput({ travelId }: { travelId: string }) {
  const [createTravelProductQuestion] = useFetchCreateTravelProductQuestion();

  const onClickTest = async () => {
    await createTravelProductQuestion({
      variables: {
        createTravelproductQuestionInput: {
          contents: "test입니다.",
        },
        travelproductId: travelId,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-end gap-4 w-full">
      <textarea
        className="w-full h-[144px] rounded-[8px] border border-[#d4d3d3] px-4 py-3 resize-none"
        placeholder="문의사항을 입력해 주세요."
      />
      <button
        onClick={onClickTest}
        className="flex justify-center items-center gap-2 px-4 py-3 bg-black rounded-[8px] font-semibold text-[18px] text-white hover:bg-black/90"
      >
        문의하기
      </button>
    </div>
  );
}
