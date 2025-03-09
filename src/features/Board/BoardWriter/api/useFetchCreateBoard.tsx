// mutation

import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
    }
  }
`;

export const useFetchCreateBoard = () => {
  const result = useMutation<Pick<Mutation, "createBoard">>(CREATE_BOARD);

  return result;
};
