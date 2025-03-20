// accessToken 재 발급하는 과정

import { Mutation } from "@/entities/api/graphql";
import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    // refreshToken을 useMutation이 아닌 graphql-request 라이브러리를 통해 요청하기 fetch도 가능
    const graphqlClient = new GraphQLClient(
      `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
      { credentials: "include" }
    );
    const result = await graphqlClient.request<
      Pick<Mutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
