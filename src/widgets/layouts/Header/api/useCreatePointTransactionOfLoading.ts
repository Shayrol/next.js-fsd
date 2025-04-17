import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
    }
  }
`;

export const useCreatePointTransactionOfLoading = () => {
  const result = useMutation<Pick<Mutation, "createPointTransactionOfLoading">>(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

  return result;
};
