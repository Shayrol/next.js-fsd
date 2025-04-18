import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_TRAVEL_PRODUCT_PICK = gql`
  mutation toggleTravelproductPick($travelproductId: ID!) {
    toggleTravelproductPick(travelproductId: $travelproductId)
  }
`;

export const useToggleTravelProductPick = () => {
  const result = useMutation<Pick<Mutation, "toggleTravelproductPick">>(
    TOGGLE_TRAVEL_PRODUCT_PICK
  );

  return result;
};
