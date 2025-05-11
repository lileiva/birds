import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache({});

export const client = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
  return new ApolloClient({
    uri: "/api/graphql",
    cache,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
    },
  });
};
