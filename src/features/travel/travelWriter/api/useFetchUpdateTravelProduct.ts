import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const UPDATE_TRAVEL_PRODUCT = gql`
  mutation updateTravelproduct(
    $updateTravelproductInput: UpdateTravelproductInput!
    $travelproductId: ID!
  ) {
    updateTravelproduct(
      updateTravelproductInput: $updateTravelproductInput
      travelproductId: $travelproductId
    ) {
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
        addressDetail
        lat
        lng
      }
      seller {
        _id
        name
        picture
      }
    }
  }
`;

export const useFetchUpdateTravelProduct = () => {
  const result = useMutation<Pick<Mutation, "updateTravelproduct">>(
    UPDATE_TRAVEL_PRODUCT
  );

  return result;
};
