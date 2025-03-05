import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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
  const result = useQuery<Pick<Query, "fetchBoards">>(BOARDS);

  return result;
};
