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
    context?: ContextType,
    topic?: string,
    used?: number,
  ) {
    this.uuid = randomUUID();
    this.word = word ? word : '';
    this.used = used ? used : 0;
    this.context = context ? context : ContextType.random;
    this.topic = topic ? topic : '';
    this.received = new Date();
    this.updated = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true })
  word!: string;

  @Column()
  used?: number;

  @Column({ type: 'enum', enum: ContextType, default: ContextType.random })
  context!: ContextType;

  @Column()
  topic?: string;

  @CreateDateColumn()
  received?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
