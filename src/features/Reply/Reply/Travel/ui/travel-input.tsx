// 댓글 입력
"use client";

import { useForm } from "react-hook-form";
import { useFetchCreateTravelProductQuestion } from "../api/useFetchCreateTravelProductQuestion";
import { yupResolver } from "@hookform/resolvers/yup";
import { travelQuestionSchema } from "../api/schema";
import { useFetchCreateTravelProductQuestionAnswer } from "../api/useFetchCreateTravelProductQuestionAnswer";
import { Dispatch, SetStateAction } from "react";
import { FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS } from "../api/useFetchTravelProductQuestionAnswers";

interface IForm {
  contents: string;
}

interface ITravelInputProps {
  travelId?: string;
  questionId?: string;
  setActiveInputId?: Dispatch<SetStateAction<string | null>>;
}

export default function TravelInput(props: ITravelInputProps) {
  const [createTravelProductQuestion] = useFetchCreateTravelProductQuestion();
  const [createTravelProductQusetionAnswer] =
    useFetchCreateTravelProductQuestionAnswer();
  const { register, handleSubmit, reset, watch } = useForm<IForm>({
    resolver: yupResolver(travelQuestionSchema),
  });

  const onSubmitQuestion = async (data: IForm) => {
    await createTravelProductQuestion({
      variables: {
        createTravelproductQuestionInput: {
          contents: data.contents,
        },
        travelproductId: props.travelId,
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

  const onSubmitQuestionAnswer = async (data: IForm) => {
    console.log("data", data);
    console.log("props.questionId", props.questionId);

    try {
      await createTravelProductQusetionAnswer({
        variables: {
          createTravelproductQuestionAnswerInput: {
            contents: data.contents,
          },
          travelproductQuestionId: props.questionId,
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS,
            variables: {
              travelproductQuestionId: props.questionId,
              page: 1,
            },
          },
        ],
      }).then(() => {
        props.setActiveInputId?.((prev: string | null) =>
          prev === String(props.questionId) ? null : String(props.questionId)
        );
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        props.questionId ? onSubmitQuestionAnswer : onSubmitQuestion
      )}
      className="flex flex-col justify-center items-end gap-4 w-full"
    >
      <textarea
        {...register("contents")}
        value={watch("contents")}
        className="w-full h-[144px] rounded-[8px] border border-[#d4d3d3] px-4 py-3 resize-none"
        placeholder={
          props.questionId
            ? "답변할 내용을 입력해 주세요."
            : "문의사항을 입력해 주세요."
        }
      />
      <div className="flex gap-4">
        {props.questionId && (
          <button
            type="button"
            onClick={() =>
              props.setActiveInputId?.((prev: string | null) =>
                prev === String(props.questionId)
                  ? null
                  : String(props.questionId)
              )
            }
            className="flex justify-center items-center gap-2 px-4 py-3 bg-white rounded-[8px] font-semibold text-[18px] text-black border border-black hover:bg-gray-100"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          className="flex justify-center items-center gap-2 px-4 py-3 bg-black rounded-[8px] font-semibold text-[18px] text-white hover:bg-black/90"
        >
          {props.questionId ? "답변하기" : "문의하기"}
        </button>
      </div>
    </form>
  );
}
