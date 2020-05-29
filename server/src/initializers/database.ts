import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User, Tom, Word, Meaning } from "@entities";

export const databaseInitializer = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Tom, Word, Meaning],
    logging: ["error"],
    synchronize: true,
  }).then((connection) => {
    console.log("Database connection established");
    return connection;
  });
};
