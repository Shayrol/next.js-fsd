import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const TRAVEL_PRODUCTS_OF_THE_BEST = gql`
  query fetchTravelproductsOfTheBest {
    fetchTravelproductsOfTheBest {
      _id
      name
      remarks
      price
      images
      pickedCount
    }
  }
`;

export const useFetchTravelproductsOfTheBest = () => {
  const result = useQuery<Pick<Query, "fetchTravelproductsOfTheBest">>(
    TRAVEL_PRODUCTS_OF_THE_BEST
  );
  return result;
};
