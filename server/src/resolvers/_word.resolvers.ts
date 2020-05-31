import { Tom, Word, Meaning } from "@entities";
import { ApolloError } from "apollo-server-koa";
import { ContextProps } from "@interfaces";

interface MeaningProps {
  text: string;
  example: string;
}

interface addWordAgrs {
  tom: number;
  name: string;
  meanings: [MeaningProps];
}

const word = async (_parent, _args, { connection }: ContextProps): Promise<Object> =>
  connection.manager.findOne(Word, {
    where: { name: _args.name },
    relations: ["tom", "meanings"],
  });

const words = (_parent, _args, { user, connection }): Promise<Array<Object>> => {
  const options = {
    skip: _args.skip,
    take: _args.take,
    where: _args.tom ? { tom: _args.tom } : null,
    order: { name: "ASC" },
    relations: ["tom", "meanings"],
  };
  return connection.manager.find(Word, options);
};

const addWord = async (_parent, _args: addWordAgrs, { user, connection }: ContextProps) => {
  if (!user) {
    throw new ApolloError("Auth error", "403");
  }

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
};

const deleteWord = async (_parent, _args, { user, connection }: ContextProps) => {
  if (!user) {
    throw new ApolloError("Auth error", "403");
  }

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
};

export const wordResolvers = {
  Query: {
    word,
    words,
  },
  Mutation: {
    addWord,
    deleteWord,
  },
};
