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

interface IProps {
  page: number;
  search: string;
  from: Date | undefined;
  to: Date | undefined;
}

export const useFetchBoards = (props: IProps) => {
  const result = useQuery<Pick<Query, "fetchBoards">>(BOARDS, {
    variables: {
      page: props.page,
      search: props.search,
      startDate: props.from,
      endDate: props.to,
    },
    fetchPolicy: "cache-first",
  });

  return result;
};
