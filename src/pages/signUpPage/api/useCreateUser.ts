import { Mutation } from "@/entities/api/graphql";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

export const useCreateUser = () => {
  const result = useMutation<Pick<Mutation, "createUser">>(CREATE_USER);

  return result;
};
