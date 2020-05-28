import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Word } from "./_word.entity";

@Entity()
export class Meaning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  text: string;

  @Column({ type: "varchar" })
  example: string;

  @ManyToOne((type) => Word, (word) => word.meanings, { onDelete: "CASCADE" })
  @JoinColumn()
  word: Word;
}
