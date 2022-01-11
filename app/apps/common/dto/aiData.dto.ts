import { randomUUID } from 'crypto';
import IntendDto from './Intent.dto';

export default class AiDataDto {
  constructor(tag?: string, intends?: IntendDto[]) {
    this.uuid = randomUUID();

    this.intends = intends;

    this.created = new Date();
  }

  uuid?: string;

  intends!: IntendDto[];

  created?: Date;

  updated?: Date;
}
