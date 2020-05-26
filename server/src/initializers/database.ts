import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Tom } from "@entities";

export const databaseInitializer = async () => {
  return await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "slomadmin",
    password: "slom2020",
    database: "slom",
    entities: [Tom],
    logging: ["query", "error"],
    synchronize: true,
  }).then((...args) => {
    console.log("Database connection established");
  });
};
