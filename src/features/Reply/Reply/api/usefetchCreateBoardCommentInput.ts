// import { CreateBoardCommentInput } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
      writer
      contents
      rating
      user {
        _id
        email
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchCreateBoardCommentInput = () => {
  const result = useMutation(CREATE_BOARD_COMMENT);

  return result;
};
