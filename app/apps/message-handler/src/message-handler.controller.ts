import { Controller, Get, Logger, Param } from '@nestjs/common';
import { MessageHandlerService } from './message-handler.service';

@Controller()
export class MessageHandlerController {
  constructor(private readonly messageHandlerService: MessageHandlerService) {}

  @Get()
  getHello(@Param('message') message: string): string {
    Logger.log(`${message}: has been received`);

    return this.messageHandlerService.getHello();
  }
}
