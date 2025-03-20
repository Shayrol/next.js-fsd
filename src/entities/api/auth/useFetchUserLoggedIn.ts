// 로그인 유저 정보

import { gql, useQuery } from "@apollo/client";
import { Query } from "../graphql";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
      createdAt
    }
  }
`;

export const useFetchUserLoggedIn = () => {
  const result = useQuery<Pick<Query, "fetchUserLoggedIn">>(
    FETCH_USER_LOGGED_IN,
    {
      fetchPolicy: "network-only",
    }
  );
  return result;
};
