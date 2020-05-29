import { Word, Meaning } from "@entities";
import { ContextProps } from "@interfaces";

interface argsProps {
  word: number;
  text: string;
  example: string;
}

export const meaningResolvers = {
  Mutation: {
    addMeaning: async (_parent, _args: argsProps, { connection }: ContextProps) => {
      const { word: wordId, text, example } = _args;

      const word = await connection.manager.findOne(Word, {
        where: { id: wordId },
      });

      const meaning = new Meaning();
      meaning.text = text;
      meaning.example = example;
      meaning.word = word;
      await connection.manager.save(meaning);

      return meaning;
    },
  },
};
