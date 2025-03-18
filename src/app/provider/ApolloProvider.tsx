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
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
