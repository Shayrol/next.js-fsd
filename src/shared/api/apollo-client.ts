import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // ssr 요청에는 true로 최적화 csr또한 최적화 된다.
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // 환경변수로 GraphQL 서버 URI 설정
  cache: new InMemoryCache(),
});

// 서버 컴포넌트에서 client.query를 호출하면 SSR로 동작하며, 캐시에 데이터를 저장.
// 클라이언트에서는 useQuery 같은 훅을 사용할 때 CSR로 동작.
