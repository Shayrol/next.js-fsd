import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS_OF_THE_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      writer
      title
      user {
        picture
        deletedAt
      }
      likeCount
      dislikeCount
    }
  }
`;

export const useFetchBoardsOfTheBest = () => {
  const result =
    useQuery<Pick<Query, "fetchBoardsOfTheBest">>(BOARDS_OF_THE_BEST);

  return result;
};
