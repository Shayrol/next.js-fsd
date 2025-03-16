import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
      }
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

export const useFetchBoard = (boardId: string) => {
  const result = useQuery<Pick<Query, "fetchBoard">>(BOARD, {
    variables: { boardId },
  });

  return result;
};
