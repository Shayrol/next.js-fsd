import { gql, useQuery } from "@apollo/client";

export const BOARD_COMMENT = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
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

export const useFetchBoardComments = (boardId: string) => {
  const result = useQuery(BOARD_COMMENT, {
    variables: { page: 1, boardId },
  });

  return result;
};
