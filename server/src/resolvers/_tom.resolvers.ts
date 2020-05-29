import { Tom } from "@entities";
import { ApolloError } from "apollo-server-koa";
import { ContextProps } from "@interfaces";

export const tomResolvers = {
  Query: {
    tom: async (_parent, _args, { connection }: ContextProps): Promise<Object> =>
      connection.manager.findOne(Tom, { id: _args.id }),

    toms: (_parent, _args, { connection }): Promise<Array<Object>> => connection.manager.find(Tom),
  },
  Mutation: {
    addTom: (_parent, _args, { user, connection }: ContextProps): Promise<Tom> => {
      if (!user) {
        throw new ApolloError("Auth error", "403");
      }

      const tom = new Tom();
      tom.name = _args.name;
      return connection.manager.save(tom);
    },
    deleteTom: async (_parent, _args, { user, connection }: ContextProps): Promise<Tom> => {
      if (!user) {
        throw new ApolloError("Auth error", "403");
      }

      try {
        const tom = await connection.manager.findOne(Tom, { id: _args.tom });

        if (!tom) {
          throw new Error("Word doesn't exist");
        }

        return await connection.manager.remove(tom!);
      } catch (error) {
        console.log(error);
        throw new ApolloError(error, "400");
      }
    },
  },
};
