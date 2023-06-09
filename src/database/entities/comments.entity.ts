import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Advertisement } from "./adverts.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 300 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Advertisement, (advert) => advert.comments, { onDelete: "CASCADE" })
  advertisement: Advertisement;
}
