import ApolloClient from "apollo-boost";
import { APOLLO_URL } from "@constants";

export const client = new ApolloClient({
  uri: APOLLO_URL,
});
