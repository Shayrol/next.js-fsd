import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
  query fetchTravelproductsIPicked($search: String, $page: Int) {
    fetchTravelproductsIPicked(search: $search, page: $page) {
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

export const useFetchTravelProductsIPicked = (
  {
    search,
    page,
  }: {
    search: string;
    page: number;
  },
  options?: QueryHookOptions<Pick<Query, "fetchTravelproductsIPicked">>
) => {
  const result = useQuery<Pick<Query, "fetchTravelproductsIPicked">>(
    FETCH_TRAVEL_PRODUCTS_I_PICKED,
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
