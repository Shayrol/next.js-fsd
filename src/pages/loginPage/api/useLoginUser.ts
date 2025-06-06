import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export const useLoginUser = () => {
  const result = useMutation<Pick<Mutation, "loginUser">>(LOGIN_USER);
  return result;
};
