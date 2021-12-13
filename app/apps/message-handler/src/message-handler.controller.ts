import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import DiscordMessage from 'apps/common/entities/message.entity';
import { MessageHandlerService } from './message-handler.service';
import { WordService } from './wordt.service';

@Controller()
export class MessageHandlerController {
  constructor(
    private readonly messageHandlerService: MessageHandlerService,
    private readonly wordService: WordService,
  ) {}

  @Get('/bag')
  async bag(@Param('message') message: string): Promise<number[]> {
    return await this.wordService.bag();
  }

  @Get()
  getHello(@Param('message') message: string): string {
    Logger.log(`${message}: has been received`);

    return this.messageHandlerService.getHello();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async learn() {
    Logger.log('Creating bag');
    await this.wordService.createBag();
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
