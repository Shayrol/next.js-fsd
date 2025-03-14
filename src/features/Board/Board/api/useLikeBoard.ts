import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const useLikeBoard = () => {
  return useMutation<Pick<Mutation, "likeBoard">>(LIKE_BOARD);
};
