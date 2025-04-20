import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING = gql`
  query fetchPointTransactionsCountOfLoading {
    fetchPointTransactionsCountOfLoading
  }
`;

export const useFetchPointTransactionsCountOfLoading = () => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsCountOfLoading">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING
  );

  return result;
};
