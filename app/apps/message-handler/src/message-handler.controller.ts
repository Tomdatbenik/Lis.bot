import { Controller, Get } from '@nestjs/common';
import { MessageHandlerService } from './message-handler.service';

@Controller()
export class MessageHandlerController {
  constructor(private readonly messageHandlerService: MessageHandlerService) {}

  @Get()
  getHello(): string {
    return this.messageHandlerService.getHello();
  }
}
