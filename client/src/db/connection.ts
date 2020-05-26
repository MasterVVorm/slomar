import "reflect-metadata";
import { Word, Tom, Meaning } from "@entities";
import { createConnection, getConnectionManager } from "typeorm";

// export default {
//   connection: null,
//   connect: async function () {
//     if (this.connection) return this.connection;

//     this.connection = await createConnection({
//       type: "postgres",
//       host: "localhost",
//       port: 5432,
//       username: "slomadmin",
//       password: "slom2020",
//       database: "slom",
//       entities: [Tom, Word, Meaning],
//       synchronize: true,
//       logging: false,
//     })

//     return this.connection
//   },
// };

export default async function () {
  let connection;
  try {
    connection = getConnectionManager().get("default");
    return connection;
  } catch (err) {
    return createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "slomadmin",
      password: "slom2020",
      database: "slom",
      entities: [Tom, Word, Meaning],
      synchronize: true,
      logging: false,
    });
  }
}
