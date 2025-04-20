// 구매 내역

import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying($search: String, $page: Int) {
    fetchPointTransactionsOfBuying(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      travelproduct {
        name
        seller {
          _id
          # name 판매자 _id 밖에 불러오지 못함...
        }
      }
      createdAt
    }
  }
`;

export const useFetchPointTransactionsOfBuying = (
  { page }: { page: number },
  options?: QueryHookOptions<Pick<Query, "fetchPointTransactionsOfBuying">>
) => {
  const result = useQuery<Pick<Query, "fetchPointTransactionsOfBuying">>(
    FETCH_POINT_TRANSACTIONS_OF_BUYING,
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
