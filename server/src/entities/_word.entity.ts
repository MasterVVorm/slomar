import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Tom } from "./_tom.entity";
import { Meaning } from "./_meaning.entity";

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne((type) => Tom)
  @JoinColumn()
  tom: Tom;

  @OneToMany((type) => Meaning, (meaning) => meaning.word)
  @JoinColumn()
  meanings: Meaning[];

  @Column({ type: "varchar", default: "pending" })
  status: String;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
