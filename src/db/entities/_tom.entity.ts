import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Word } from "./_word.entity";

@Entity()
export class Tom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(type => Word, word => word.tom)
  @JoinColumn()
  words: Word;
}
