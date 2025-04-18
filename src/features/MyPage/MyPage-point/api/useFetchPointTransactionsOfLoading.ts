// 충전 내역

import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading($search: String, $page: Int) {
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      createdAt
    }
  }
`;

export const useFetchPointTransactionsOfLoading = (
  { page }: { page: number },
  options?: QueryHookOptions<Pick<Query, "fetchPointTransactionsOfLoading">>
) => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsOfLoading">>(
    FETCH_POINT_TRANSACTIONS_OF_LOADING,
    {
      variables: {
        search: "",
        page,
      },
      ...options,
    }
  );

  return result;
};
