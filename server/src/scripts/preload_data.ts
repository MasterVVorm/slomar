import fs from "fs";
import xlsx from "node-xlsx";
import dotenv from "dotenv";
import { databaseInitializer } from "@initializers/database";
import { Tom, Meaning, Word } from "@entities";
import { Connection } from "typeorm";

dotenv.config();

interface SheetArray {
  name: string;
  data: Array<Array<string>>;
}

interface TomObject {
  name: string;
  sheetPath: string;
}

const toms: Array<TomObject> = [
  {
    name: "Пизда",
    sheetPath: "tom2.xlsx",
  },
  {
    name: "Ебаться",
    sheetPath: "tom3.xlsx",
  },
];

async function loadData() {
  const connection: Connection = await databaseInitializer();

  for (let tom of toms) {
    let _tom = await connection.manager.findOne(Tom, { name: tom.name });

    if (!_tom) {
      _tom = new Tom();
      _tom.name = tom.name;
      await connection.manager.save(_tom);
    }

    let sheetTomWords: Array<SheetArray> = await xlsx.parse(fs.readFileSync(`preload/${tom.sheetPath}`));
    let _sheetTomWords: Array<Array<string>> = sheetTomWords[0].data.filter((sheet) => !!sheet.length);

    for (let wordData of _sheetTomWords) {
      let word = await connection.manager.findOne(Word, { name: wordData[0] });

      if (word) {
        let meaning = await connection.manager.findOne(Meaning, { text: wordData[1] });

        if (!meaning) {
          let _meaning = new Meaning();
          _meaning.text = wordData[1];
          _meaning.example = wordData[3] || "Пока нет примера";
          _meaning.word = word;
          await connection.manager.save(_meaning);
        }
      } else {
        word = new Word();
        word.name = wordData[0];
        word.tom = _tom;

        let meaning = new Meaning();
        meaning.text = wordData[1];
        meaning.example = wordData[3] || "Пока нет примера";

        await connection.manager.save(meaning);

        word.meanings = [meaning];

        await connection.manager.save(word);
      }
    }

    console.log(`Data from ${tom.sheetPath} file have been uploaded!`);
  }

  connection.close();
}

loadData();
