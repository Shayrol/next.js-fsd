import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      price
      soldAt
    }
  }
`;

export const useCreatePointTransactionOfBuyingAndSelling = () => {
  const result = useMutation<
    Pick<Mutation, "createPointTransactionOfBuyingAndSelling">
  >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

  return result;
};
