import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Tom } from "./_tom.entity";
import { Meaning } from "./_meaning.entity";

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Tom)
  @JoinColumn()
  tom: Tom;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany((type) => Meaning, (meaning) => meaning.word)
  @JoinColumn()
  meanings: Meaning;
}
