import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Advertisement } from "./adverts.entity";
import { Comment } from "./comments.entity";
import { Address } from "./adresses.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 250 })
  name: string;

  @Column({ unique: true, length: 14 })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 14 })
  telephone: string;

  @Column({ length: 10 })
  date_of_birth: string;

  @Column({ length: 300 })
  description: string;

  @Column({ default: true })
  buyer: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: null })
  token: string

  @OneToMany(() => Advertisement, (advertisement) => advertisement.user)
  advertisements: Advertisement[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: "CASCADE" })
  comments: Comment[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
