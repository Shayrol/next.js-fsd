"use client";

import { useAccessTokenStore } from "@/stores/tokenStore";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const GLOBAL_STATE = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}) as unknown as ApolloLink;

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken } = useAccessTokenStore();
  console.log("accessToken: ", accessToken);
  const client = new ApolloClient({
    // ssrMode: typeof window === "undefined", // ssr 요청에는 true로 최적화 csr또한 최적화 된다.
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
