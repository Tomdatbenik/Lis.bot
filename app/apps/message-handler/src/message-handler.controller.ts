import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Dictionary as Dictionary } from 'apps/common/dto/dictionary.dto';
import ResponseDto from 'apps/common/dto/response.dto';
import DiscordMessage from 'apps/common/entities/message.entity';
import { response } from 'express';
import { DictionaryService } from './dictionary.service';
import { MessageHandlerService } from './message-handler.service';
import { TeachService } from './teach.service';
import { WordService } from './wordt.service';

@Controller()
export class MessageHandlerController {
  constructor(
    private readonly messageHandlerService: MessageHandlerService,
    private readonly wordService: WordService,
    private readonly dictionaryService: DictionaryService,
    private readonly teachService: TeachService
  ) { }

  @Get('/bag')
  async bag(): Promise<number[]> {
    return await this.wordService.bag();
  }

  @Get('/ai/data')
  async aiData(): Promise<any> {
    return await this.messageHandlerService.getAiData();
  }

  @Get('/learn')
  async learnRandomChannel() {
    console.log('request learn')
    this.teachService.sendResponseRequest();
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
    await this.messageHandlerService.markAiMessages();
    await this.teachService.learn();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async learnChannel5Min() {
    Logger.log('EVERY_5_MINUTES');
    this.teachService.sendResponseRequest();
  }

  @Cron("0 */29 * * * *")
  async learnChannel1Hour() {
    this.messageHandlerService.resetMessageMiniIds();
  }

  @Post('/response')
  async response(@Body() response: ResponseDto,): Promise<void> {
    const message = await this.messageHandlerService.getMessageByMinId(response.minId)

    if (message != undefined) {
      message.response = response.response;
      await this.messageHandlerService.saveMessage(message);
    }
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
