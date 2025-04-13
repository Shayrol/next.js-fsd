import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_TRAVEL_PRODUCTS_I_SOLD = gql`
  query fetchTravelproductsISold($search: String, $page: Int) {
    fetchTravelproductsISold(search: $search, page: $page) {
      _id
      name
      price
      createdAt
      buyer {
        _id
        name
      }
      soldAt
    }
  }
`;

export const useFetchTravelProductsISold = (
  {
    search,
    page,
  }: {
    search: string;
    page: number;
  },
  options?: QueryHookOptions<Pick<Query, "fetchTravelproductsISold">>
) => {
  const result = useQuery<Pick<Query, "fetchTravelproductsISold">>(
    FETCH_TRAVEL_PRODUCTS_I_SOLD,
    {
      variables: {
        search,
        page,
      },
      ...options,
    }
  );

  return result;
};
