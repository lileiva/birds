import { useEffect, useState, type PropsWithChildren } from "react";

import { ApolloProvider } from "@apollo/client";

import { client } from "../lib/apollo";

const ApiProvider = ({ children }: PropsWithChildren) => {
  const [apolloClient, setApolloClient] = useState<Awaited<
    ReturnType<typeof client>
  > | null>(null);

  useEffect(() => {
    const initializeApolloClient = async () => {
      const clientInstance = await client();
      setApolloClient(clientInstance);
    };

    initializeApolloClient();
  }, []);

  if (!apolloClient) return null;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApiProvider;
