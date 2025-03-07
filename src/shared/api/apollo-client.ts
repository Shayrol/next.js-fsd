import { ApolloClient, InMemoryCache } from "@apollo/client";

const GLOBAL_STATE = new InMemoryCache();

export const client = new ApolloClient({
  // ssrMode: typeof window === "undefined", // ssr 요청에는 true로 최적화 csr또한 최적화 된다.
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // 환경변수로 GraphQL 서버 URI 설정
  cache: GLOBAL_STATE,
});
