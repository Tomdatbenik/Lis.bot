import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Dictonairy as Dictionary } from 'apps/common/dto/dictonairy.dto';
import DiscordMessage from 'apps/common/entities/message.entity';
import { DictionaryService } from './dictionary.service';
import { MessageHandlerService } from './message-handler.service';
import { WordService } from './wordt.service';

@Controller()
export class MessageHandlerController {
  constructor(
    private readonly messageHandlerService: MessageHandlerService,
    private readonly wordService: WordService,
    private readonly dictionaryService: DictionaryService
  ) { }

  @Get('/bag')
  async bag(@Param('message') message: string): Promise<number[]> {
    return await this.wordService.bag();
  }
  
  @Get('/dictionary')
  async dictonairy(@Param('word') word: string): Promise<Dictionary> {
    return await this.dictionaryService.dictionary(word);
  }

  @Post('/createBag')
  async createBag(): Promise<any> {
    return await this.wordService.createBag();
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
