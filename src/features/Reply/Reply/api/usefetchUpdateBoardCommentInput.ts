import { gql, useMutation } from "@apollo/client";

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $boardCommentId: ID!
    $password: String
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      boardCommentId: $boardCommentId
      password: $password
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export const useFetchUpdateBoardCommentInput = () => {
  return useMutation(UPDATE_BOARD_COMMENT);
};
