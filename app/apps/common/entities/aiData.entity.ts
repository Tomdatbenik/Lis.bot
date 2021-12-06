import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Intend from './Intend.entity';

@Entity()
export default class AiData {
  constructor(tag?: string, intends?: Intend[]) {
    this.uuid = randomUUID();

    this.intends = intends;

    this.created = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @OneToMany(() => Intend, (intend) => intend.aiData, { eager: true })
  intends!: Intend[];

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
