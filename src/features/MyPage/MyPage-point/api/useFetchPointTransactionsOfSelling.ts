// 판매 내역

import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
  query fetchPointTransactionsOfSelling($search: String, $page: Int) {
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      createdAt
      travelproduct {
        name
      }
    }
  }
`;

export const useFetchPointTransactionsOfSelling = (
  { page }: { page: number },
  options?: QueryHookOptions<Pick<Query, "fetchPointTransactionsOfSelling">>
) => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsOfSelling">>(
    FETCH_POINT_TRANSACTIONS_OF_SELLING,
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
