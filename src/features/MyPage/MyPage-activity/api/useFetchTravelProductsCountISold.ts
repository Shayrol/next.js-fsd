import { Query } from "@/entities/api/graphql";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD = gql`
  query fetchTravelproductsCountISold {
    fetchTravelproductsCountISold
  }
`;

export const useFetchTravelProductsCountISold = (
  options?: QueryHookOptions<Pick<Query, "fetchTravelproductsCountISold">>
) => {
  const result = useQuery<Pick<Query, "fetchTravelproductsCountISold">>(
    FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD,
    {
      ...options,
    }
  );

  return result;
};
