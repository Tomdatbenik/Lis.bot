import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import ContextType from '../enums/Context.enum';

@Entity()
export default class Word {
  constructor(
    word?: string,
    tag?: string,
    used?: number,
  ) {
    this.uuid = randomUUID();
    this.word = word ? word : '';
    this.tag = tag ? tag : '';
    this.received = new Date();
    this.updated = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true })
  word!: string;

  @Column()
  tag?: string;

  @CreateDateColumn()
  received?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
