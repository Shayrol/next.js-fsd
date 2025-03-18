import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const BOARDS_COUNT = gql`
  query fetchBoardsCount(
    $search: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;

interface IProps {
  page: number;
  search: string;
  from: Date | undefined;
  to: Date | undefined;
}

export const useFetchBoardsCount = (props: IProps) => {
  const result = useQuery<Pick<Query, "fetchBoardsCount">>(BOARDS_COUNT, {
    variables: {
      page: props.page,
      search: props.search,
      from: props.from,
      to: props.to,
    },
  });

  return result;
};
