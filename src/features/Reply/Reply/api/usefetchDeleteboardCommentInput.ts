import { gql, useMutation } from "@apollo/client";

export const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;

export const useFetchDeleteBoardComment = () => {
  return useMutation(DELETE_BOARD_COMMENT);
};
