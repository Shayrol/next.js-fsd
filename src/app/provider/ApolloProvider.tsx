// src/app/provider/apolloClient.ts
import { client } from "@/shared/api/apollo-client";
import { ApolloProvider } from "@apollo/client";

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
