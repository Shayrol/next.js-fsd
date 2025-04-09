// 댓글 입력

import { useForm } from "react-hook-form";
import { useFetchCreateTravelProductQuestion } from "../api/useFetchCreateTravelProductQuestion";
import { yupResolver } from "@hookform/resolvers/yup";
import { travelQuestionSchema } from "../api/schema";

interface IForm {
  contents: string;
}

interface ITravelInputProps {
  travelId: string;
  questionId?: string;
}

export default function TravelInput({
  travelId,
  questionId,
}: ITravelInputProps) {
  const [createTravelProductQuestion] = useFetchCreateTravelProductQuestion();
  const { register, handleSubmit, reset, watch } = useForm<IForm>({
    resolver: yupResolver(travelQuestionSchema),
  });

  const onSubmitQuestion = async (data: IForm) => {
    await createTravelProductQuestion({
      variables: {
        createTravelproductQuestionInput: {
          contents: data.contents,
        },
        travelproductId: travelId,
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchTravelproductQuestions(prev) {
              const newTravelProductQuestion =
                data?.createTravelproductQuestion;
              const newTravelProductQuestions = [
                newTravelProductQuestion,
                ...prev,
              ];
              return newTravelProductQuestions;
            },
          },
        });
      },
    }).then(() => {
      reset();
    });
  };

  const onSubmitQuestionAnswer = async (data: IForm) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmitQuestion)}
      className="flex flex-col justify-center items-end gap-4 w-full"
    >
      <textarea
        {...register("contents")}
        value={watch("contents")}
        className="w-full h-[144px] rounded-[8px] border border-[#d4d3d3] px-4 py-3 resize-none"
        placeholder="문의사항을 입력해 주세요."
      />
      <button
        type="submit"
        className="flex justify-center items-center gap-2 px-4 py-3 bg-black rounded-[8px] font-semibold text-[18px] text-white hover:bg-black/90"
      >
        문의하기
      </button>
    </form>
  );
}

// 대댓글 입력 API 추가 및 댓글, 대댓글 구분하기
