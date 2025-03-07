import Koa from "koa";
import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import { importSchema } from "graphql-import";
import path from "path";
import { merge } from "lodash";
import dotenv from "dotenv";

import { databaseInitializer } from "@initializers/database";
import { authResolvers, tomResolvers, wordResolvers, meaningResolvers, searchResolvers } from "@resolvers";
import { createJwtMiddleware } from "@middleware";

dotenv.config();
const PORT = process.env.PORT || 3000;

export const startApp = async () => {
  const connection = await databaseInitializer();

  const app = new Koa();
  app.use(cors());
  app.use(createJwtMiddleware(connection));

  const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));

  const server = new ApolloServer({
    typeDefs,
    resolvers: merge(authResolvers, tomResolvers, wordResolvers, meaningResolvers, searchResolvers),
    context: async ({ ctx: { state: user } }) => ({
      connection,
      user,
    }),
    playground: true,
  });

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => console.log(`\n 🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};
