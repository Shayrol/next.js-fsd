import { gql, useMutation } from "@apollo/client";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export const useLogoutUser = () => {
  const result = useMutation(LOGOUT_USER);

  return result;
};
