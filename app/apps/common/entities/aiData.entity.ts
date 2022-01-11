import { randomUUID } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Intent from './Intent.entity';

@Entity()
export default class AiData {
  constructor(tag?: string, intends?: Intent[]) {
    this.uuid = randomUUID();

    this.intends = intends;

    this.created = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @OneToMany(() => Intent, (intend) => intend.aiData, { eager: true })
  intends!: Intent[];

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
