// 전체 내역

import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      travelproduct {
        _id
        name
      }
      createdAt
    }
  }
`;

export const useFetchPointTransactions = (
  { page }: { page: number },
  options?: QueryHookOptions<Pick<Query, "fetchPointTransactions">>
) => {
  const result = useQuery<Pick<Query, "fetchPointTransactions">>(
    FETCH_POINT_TRANSACTIONS,
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
