import { Query } from "@/entities/api/graphql";
import { gql, useQuery } from "@apollo/client";

export const TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
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
      seller {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

export const useFetchTravelProduct = ({ travelId }: { travelId: string }) => {
  const result = useQuery<Pick<Query, "fetchTravelproduct">>(TRAVEL_PRODUCT, {
    variables: { travelproductId: travelId },
  });

  return result;
};
