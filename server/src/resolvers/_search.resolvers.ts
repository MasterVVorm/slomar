import { Connection, Like } from "typeorm";
import { ContextProps } from "@interfaces";
import { Word } from "@entities";

export const searchResolvers = {
  Query: {
    search: (_, { word }, { connection }: ContextProps) =>
      connection.manager.find(Word, { name: Like(`%${word.toLowerCase()}%`) }),
  },
};
