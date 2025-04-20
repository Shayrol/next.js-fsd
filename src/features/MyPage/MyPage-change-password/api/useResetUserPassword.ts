import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

export const useResetUserPassword = () => {
  const result =
    useMutation<Pick<Mutation, "resetUserPassword">>(RESET_USER_PASSWORD);

  return result;
};
