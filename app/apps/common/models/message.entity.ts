import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class DiscordMessage {
  constructor(message?: string, authorId?: string, authorName?: string) {
    this.uuid = randomUUID();
    this.message = message ? message : '';
    this.authorId = authorId ? authorId : '';
    this.authorName = authorName ? authorName : '';
    this.received = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column()
  message!: string;

  @Column()
  authorId?: string;

  @Column()
  authorName?: string;

  @CreateDateColumn()
  received?: Date;
}
