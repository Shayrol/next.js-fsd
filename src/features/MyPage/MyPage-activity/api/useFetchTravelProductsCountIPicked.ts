import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_TRAVEL_PRODUCTS_COUNT_I_PIKCED = gql`
  query fetchTravelproductsCountIPicked {
    fetchTravelproductsCountIPicked
  }
`;

export const useFetchTravelProductsCountIPicked = (
  options: QueryHookOptions<Pick<Query, "fetchTravelproductsCountIPicked">>
) => {
  const result = useQuery(FETCH_TRAVEL_PRODUCTS_COUNT_I_PIKCED, {
    ...options,
  });

  return result;
};
