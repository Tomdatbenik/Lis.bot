import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class DiscordMessage {
  constructor(message = '', authorId = '', authorName = '', intend = '', response = '', context: "") {
    this.uuid = randomUUID();
    this.message = message
    this.authorId = authorId;
    this.intend = intend;
    this.context = context;
    this.response = response;
    this.authorName = authorName
    this.received = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column()
  intend!: string;

  @Column()
  context!: string;

  @Column()
  response!: string;

  @Column()
  message!: string;

  @Column()
  authorId?: string;

  @Column()
  authorName?: string;

  @CreateDateColumn()
  received?: Date;
}
