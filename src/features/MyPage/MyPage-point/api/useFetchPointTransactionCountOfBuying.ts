import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
  query fetchPointTransactionsCountOfBuying {
    fetchPointTransactionsCountOfBuying
  }
`;

export const useFetchPointTransactionsCountOfBuying = () => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsCountOfBuying">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING
  );

  return result;
};
