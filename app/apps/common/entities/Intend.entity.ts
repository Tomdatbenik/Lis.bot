import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import AiData from './aiData.entity';

@Entity()
export default class Intend {
  constructor(
    tag?: string,
    patterns?: string[],
    responses?: string[],
    context?: string[],
  ) {
    this.uuid = randomUUID();
    this.tag = tag;
    this.patterns = patterns;
    this.responses = responses;
    this.context = context;
    this.created = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column()
  tag!: string;

  @Column('simple-array')
  patterns?: string[];

  @Column('simple-array')
  responses?: string[];

  @Column('simple-array')
  context?: string[];

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;

  @ManyToOne(() => AiData, (aiData) => aiData.intends)
  aiData: AiData;
}
