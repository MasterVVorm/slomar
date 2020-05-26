import "reflect-metadata";
import { Word, Tom, Meaning } from "@entities";
import { createConnection } from "typeorm";

const connection = createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "slomadmin",
  password: "slom2020",
  database: "slom",
  entities: [Tom, Word, Meaning],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    console.log(connection);
  })
  .catch((error) => console.log(error));

export default connection;
