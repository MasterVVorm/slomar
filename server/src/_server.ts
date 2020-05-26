import Koa from "koa";
import { databaseInitializer } from "@initializers/database";
import { ApolloServer } from "apollo-server-koa";
import { importSchema } from "graphql-import";
import path from "path";

export const startApp = async () => {
  const connection = await databaseInitializer();

  const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));

  const resolvers = {
    Query: {
      hello: () => "Hello world!",
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers, playground: true });

  const app = new Koa();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}  `
    )
  );
};
