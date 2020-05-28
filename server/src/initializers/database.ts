import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User, Tom, Word, Meaning } from "@entities";

export const databaseInitializer = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "slomadmin",
    password: "slom2020",
    database: "slom",
    entities: [User, Tom, Word, Meaning],
    logging: ["error"],
    synchronize: true,
  }).then((connection) => {
    console.log("Database connection established");
    return connection;
  });
};
