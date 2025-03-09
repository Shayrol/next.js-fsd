import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS = gql`
  query fetchBoards(
    $page: Int
    $search: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    fetchBoards(
      page: $page
      search: $search
      startDate: $startDate
      endDate: $endDate
    ) {
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

export const useFetchBoards = () => {
  const result = useQuery<Pick<Query, "fetchBoards">>(BOARDS, {
    fetchPolicy: "network-only",
  });

  return result;
};
