import { Tom, Word, Meaning } from "@entities";
import { Connection, QueryFailedError } from "typeorm";
import { ApolloError } from "apollo-server-koa";

interface MeaningProps {
  text: string;
  example: string;
}

interface addWordAgrs {
  tom: number;
  name: string;
  meanings: [MeaningProps];
}

export const createWordResolvers = (connection: Connection) => ({
  Query: {
    word: async (_parent, _args): Promise<Object> =>
      connection.manager.findOne(Word, {
        where: { id: _args.id },
        relations: ["tom", "meanings"],
      }),

    words: (_parent, _args, { user }): Promise<Array<Object>> => {
      console.log(user);
      return connection.manager.find(Word, {
        skip: _args.skip,
        take: _args.take,
        order: { name: "ASC" },
        relations: ["tom", "meanings"],
      });
    },
  },
  Mutation: {
    addWord: async (_parent, _args: addWordAgrs) => {
      const { tom: tomId, name, meanings } = _args;

      try {
        const tom = await connection.manager.findOne(Tom, { id: tomId });

        const word = new Word();
        word.name = name;
        word.tom = tom;
        word.meanings = [];

        let _meanings: Array<Meaning> = [];

        for (let meaning of meanings) {
          let _meaning = new Meaning();
          _meaning.text = meaning.text;
          _meaning.example = meaning.example;
          await connection.manager.save(_meaning);
          _meanings.push(_meaning);
        }

        word.meanings = _meanings;

        await connection.manager.save(word);

        return word;
      } catch (error) {
        switch (error.code) {
          case "23505":
            throw new ApolloError("Word name must be unique", "400");
          default:
            throw new ApolloError("Something went wrong", error);
        }
      }
    },

    deleteWord: async (_parent, _args) => {
      try {
        const word = await connection.manager.findOne(Word, { id: _args.word });
        if (!word) {
          throw new Error("Word doesn't exist");
        }
        return await connection.manager.remove(word!);
      } catch (error) {
        console.log(error);
        throw new ApolloError(error, "400");
      }
    },
  },
});
