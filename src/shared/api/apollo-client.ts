import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // 환경변수로 GraphQL 서버 URI 설정
  cache: new InMemoryCache(),
});
