import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Word } from "./_word.entity";

@Entity()
export class Tom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
