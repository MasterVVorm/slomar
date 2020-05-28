import { Tom } from "@entities";
import { Connection } from "typeorm";

export const createTomResolvers = (connection: Connection) => ({
  Query: {
    tom: async (_parent, _args): Promise<Object> =>
      connection.manager.findOne(Tom, { id: _args.id }),

    toms: (): Promise<Array<Object>> => connection.manager.find(Tom),
  },
  Mutation: {
    addTom: (_parent, _args) => {
      const tom = new Tom();
      tom.name = _args.name;
      return connection.manager.save(tom);
    },
  },
});
