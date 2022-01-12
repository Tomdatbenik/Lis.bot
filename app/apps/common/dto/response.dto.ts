import { randomUUID } from 'crypto';
import IntendDto from './Intent.dto';

export default class ResponseDto {
  constructor(minId?: string, response?: string) {
    this.minId = minId;
    this.response = response;
  }

  minId: string;

  response: string;
}
