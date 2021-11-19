import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Word {
  constructor(word?: string, authorId?: string, used?: number) {
    this.uuid = randomUUID();
    this.word = word ? word : '';
    this.used = used ? used : 0;
    this.received = new Date();
    this.updated = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true })
  word!: string;

  @Column()
  used?: number;

  @CreateDateColumn()
  received?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
