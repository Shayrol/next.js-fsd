import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS_OF_THE_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      likeCount
      dislikeCount
      images
      user {
        picture
        deletedAt
      }
      createdAt
    }
  }
`;

export const useFetchBoardsOfTheBest = () => {
  const result =
    useQuery<Pick<Query, "fetchBoardsOfTheBest">>(BOARDS_OF_THE_BEST);

  return result;
};
