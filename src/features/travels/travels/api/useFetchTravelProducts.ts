import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

const TRAVEL_PRODUCTS = gql`
  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {
    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      buyer {
        _id
        name
        picture
      }
      seller {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

interface UseFetchTravelProductsArgs {
  isSoldout: boolean;
  search: string | null;
  page: number;
}

export const useFetchTravelProducts = ({
  isSoldout,
  search,
  page,
}: UseFetchTravelProductsArgs) => {
  const result = useQuery<Pick<Query, "fetchTravelproducts">>(TRAVEL_PRODUCTS, {
    variables: {
      isSoldout,
      search,
      page,
    },
  });

  return result;
};
