import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@entities";
import { ApolloError, AuthenticationError } from "apollo-server-koa";
import { ContextProps } from "@interfaces";

export const authResolvers = {
  Mutation: {
    login: async (_, { email, password }, { connection }: ContextProps) => {
      const user = await connection.manager.findOne(User, { email: email });

      if (!user) {
        throw new ApolloError("No user", "400");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError("Can't authrenticate with provided credentials");
      }

      return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    },
  },
};
