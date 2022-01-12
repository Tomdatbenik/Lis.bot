import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Dictionary as Dictionary } from 'apps/common/dto/dictionary.dto';
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
  async bag(): Promise<number[]> {
    return await this.wordService.bag();
  }

  @Get('/ai/data')
  async aiData(): Promise<any> {
    return await this.messageHandlerService.getAiData();
  }


  @Get('/dictionary/')
  async dictonairy(@Query('word') word: string): Promise<Dictionary[]> {
    return await this.dictionaryService.dictionary(word);
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

  @Cron(CronExpression.EVERY_5_MINUTES)
  async learnChannel5Min() {
    Logger.log('EVERY_5_MINUTES');
    //TODO ask response
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async learnChannel30Min() {
    Logger.log('EVERY_30_MINUTES');
    //TODO remove every sentence with small id without response
  }

  @Cron(CronExpression.EVERY_HOUR)
  async learnChannel1Hour() {
    Logger.log('EVERY_HOUR');

  }

  @Post('/createBag')
  async createBag(): Promise<any> {
    return await this.wordService.createBag();
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
