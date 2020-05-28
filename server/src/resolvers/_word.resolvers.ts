import { Tom, Word, Meaning } from "@entities";
import { Connection } from "typeorm";

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
      connection.manager.findOne(Word, {where: {id: _args.id}, relations: ["tom", "meanings"] }),

    words: (): Promise<Array<Object>> => connection.manager.find(Word, {order: {id: "ASC"}, relations: ["tom","meanings"]}),
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
        return error;
      }
    },
  },
});
