import readline from "readline";
import { databaseInitializer } from "@initializers/database";
import { User } from "@entities";
import bcrypt from "bcrypt";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

databaseInitializer().then(connection => {
  rl.question("Enter password: ", async password => {
    const user = await connection.manager.findOne(User, {where: {email: "mvincha404@gmail.com"}})
    bcrypt.compare(password, user.password, (err, result) => {
      console.log(result)
      rl.close()
    })
  })
})
