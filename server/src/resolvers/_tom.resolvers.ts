import { Tom, Word } from "@entities";
import { ApolloError } from "apollo-server-koa";
import { ContextProps } from "@interfaces";

export const tomResolvers = {
  Query: {
    tom: async (_parent, _args, { connection }: ContextProps): Promise<Object> =>
      connection.manager.findOne(Tom, { id: _args.id }),

    toms: async (_parent, _args, { connection }): Promise<Array<Object>> => {
      const toms = await connection.manager.find(Tom);

      for (let i = 0; i < toms.length; i++) {
        const words = await connection.manager.find(Word, { where: { tom: toms[i] } });
        console.log(words.length)
        toms[i].words_amount = words.length;
      }

      return toms;
    },
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
