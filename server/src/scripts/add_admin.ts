import readline from "readline";
import { databaseInitializer } from "@initializers/database";
import { User } from "@entities";
import bcrypt from "bcrypt";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter email: ", (email) => {
  rl.question("Enter password: ", async (password) => {
    const connection = await databaseInitializer();

    bcrypt.hash(password, 10, (err, hash) => {
      const user = new User();
      user.email = "mvincha404@gmail.com";
      user.password = hash;
      user.is_admin = true;

      connection.manager.save(user).then(() => {
        console.log("Admin added");
        rl.close();
      });
    });
  });
});
