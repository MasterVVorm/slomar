import Koa from "koa";
import koaJwt from "koa-jwt";
import { databaseInitializer } from "@initializers/database";
import { ApolloServer } from "apollo-server-koa";
import { importSchema } from "graphql-import";
import path from "path";
import { merge } from "lodash";
import dotenv from "dotenv";

import {
  createTomResolvers,
  createWordResolvers,
  createMeaningResolvers,
  createAuthResolvers,
} from "@resolvers";

dotenv.config();
const PORT = process.env.PORT;

export const startApp = async () => {
  const connection = await databaseInitializer();

  const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));

  const server = new ApolloServer({
    typeDefs,
    resolvers: merge(
      createTomResolvers(connection),
      createWordResolvers(connection),
      createMeaningResolvers(connection),
      createAuthResolvers(connection)
    ),
    context: ({ ctx: { state: user } }) => ({
      user,
    }),
    playground: true,
  });

  const app = new Koa();
  app.use(koaJwt({ secret: process.env.JWT_SECRET, passthrough: true }));
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(
      `\n 🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
