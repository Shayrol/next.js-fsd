import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export const useFetchBoardsCount = () => {
  const result = useQuery<Pick<Query, "fetchBoardsCount">>(BOARDS_COUNT);

  return result;
};
