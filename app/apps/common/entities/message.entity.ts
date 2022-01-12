import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class DiscordMessage {
  constructor(message?: string, authorId?: string, authorName?: string, intend?: string, context?: string, response?: string) {
    this.uuid = randomUUID();
    this.message = message
    this.authorId = authorId;
    this.intent = intend;
    this.context = context;
    this.response = response;
    this.authorName = authorName
    this.received = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column()
  minId?: string;

  @Column()
  intent?: string;

  @Column()
  context?: string;

  @Column()
  response?: string;

  @Column()
  message!: string;

  @Column()
  authorId?: string;

  @Column()
  authorName?: string;

  @Column()
  aiMarked?: boolean = false;

  @CreateDateColumn()
  received?: Date;
}
