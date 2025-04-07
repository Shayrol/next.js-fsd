import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const DELETE_TRAVEL_PRODUCT = gql`
  mutation deleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;

export const useFetchDeleteTravelProduct = () => {
  const result = useMutation<Pick<Mutation, "deleteTravelproduct">>(
    DELETE_TRAVEL_PRODUCT
  );

  return result;
};
