import { gql, ApolloServer } from "apollo-server-micro";
import connection from "@db/connection";

const typeDefs = gql`
  type Query {
    testMessage: String!
  }
`;

const resolvers = {
  Query: {
    testMessage: (): String => "Hello!",
  },
};

const server: ApolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context: () => ({}),
});

const handler = server.createHandler({
  path: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
