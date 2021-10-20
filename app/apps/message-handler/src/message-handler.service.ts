import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageHandlerService {
  getHello(): string {
    return 'Hello World!';
  }
}
