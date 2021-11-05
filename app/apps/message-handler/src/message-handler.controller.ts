import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import DiscordMessage from 'apps/common/models/message.entity';
import { MessageHandlerService } from './message-handler.service';

@Controller()
export class MessageHandlerController {
  constructor(private readonly messageHandlerService: MessageHandlerService) {}

  @Get()
  getHello(@Param('message') message: string): string {
    Logger.log(`${message}: has been received`);

    return this.messageHandlerService.getHello();
  }

  @Post()
  async logMessage(
    @Body() discordMessage: DiscordMessage,
  ): Promise<DiscordMessage> {
    Logger.log(
      `${discordMessage.message} by ${discordMessage.authorName}: has been received`,
    );
    
    return await this.messageHandlerService.saveMessage(discordMessage);
  }
}
