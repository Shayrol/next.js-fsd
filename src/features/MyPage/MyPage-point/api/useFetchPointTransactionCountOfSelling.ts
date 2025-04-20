import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
  query fetchPointTransactionsCountOfSelling {
    fetchPointTransactionsCountOfSelling
  }
`;

export const useFetchPointTransactionsCountOfSelling = () => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsCountOfSelling">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING
  );

  return result;
};
