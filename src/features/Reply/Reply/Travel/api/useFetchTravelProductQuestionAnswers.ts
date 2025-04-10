// 대댓글 목록

import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS = gql`
  query fetchTravelproductQuestionAnswers(
    $page: Int
    $travelproductQuestionId: ID!
  ) {
    fetchTravelproductQuestionAnswers(
      page: $page
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchTravelProductQuestionAnswers = ({
  page,
  travelproductQuestionId,
}: {
  page: number;
  travelproductQuestionId: string;
}) => {
  const result = useQuery<Pick<Query, "fetchTravelproductQuestionAnswers">>(
    FETCH_TRAVEL_PRODUCT_QUESTION_ANSWERS,
    {
      variables: {
        page,
        travelproductQuestionId,
      },
    }
  );

  return result;
};
