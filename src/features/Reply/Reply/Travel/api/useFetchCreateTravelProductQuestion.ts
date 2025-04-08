// 댓글 등록

import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
      contents
      # travelproduct {
      #   _id
      #   name
      #   seller {
      #     _id
      #     name
      #     picture
      #   }
      # }
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchCreateTravelProductQuestion = () => {
  const result = useMutation<Pick<Mutation, "createTravelproductQuestion">>(
    CREATE_TRAVEL_PRODUCT_QUESTION
  );

  return result;
};
