import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
    }
  }
`;

export const useFetchUpdateBoard = () => {
  return useMutation<Pick<Mutation, "updateBoard">>(UPDATE_BOARD);
};
