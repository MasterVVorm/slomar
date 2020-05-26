import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Tom } from "./_tom.entity";
import { Word } from "./_word.entity";

@Entity()
export class Meaning {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Word)
  @JoinColumn()
  word: Word;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  example: string;
}
