import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const DIS_LIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export const useDisLikeBoard = () => {
  return useMutation<Pick<Mutation, "dislikeBoard">>(DIS_LIKE_BOARD);
};
