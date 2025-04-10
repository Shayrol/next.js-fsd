import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER = gql`
  mutation createTravelproducQuestionAnswer(
    $createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput!
    $travelproductQuestionId: ID!
  ) {
    createTravelproductQuestionAnswer(
      createTravelproductQuestionAnswerInput: $createTravelproductQuestionAnswerInput
      travelproductQuestionId: $travelproductQuestionId
    ) {
      _id
      contents
      travelproductQuestion {
        _id
        contents
      }
      user {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchCreateTravelProductQuestionAnswer = () => {
  const result = useMutation<
    Pick<Mutation, "createTravelproductQuestionAnswer">
  >(CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER);

  return result;
};
