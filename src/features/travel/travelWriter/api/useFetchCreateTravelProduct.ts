import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproduct(
    $createTravelproductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      seller {
        _id
        name
        picture
      }
    }
  }
`;

export const useFetchCreateTravelProduct = () => {
  const result = useMutation<Pick<Mutation, "createTravelproduct">>(
    CREATE_TRAVEL_PRODUCT
  );

  return result;
};
