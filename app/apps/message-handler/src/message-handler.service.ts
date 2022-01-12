import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, Unique } from 'typeorm';
import { Tagger, Lexer } from 'pos';
import * as Intent from 'sentence-intent';
import { randomInt, randomUUID } from 'crypto';
import IntentDto from 'apps/common/dto/Intent.dto';
import { Message } from 'discord.js';

@Injectable()
export class MessageHandlerService {
  private readonly logger = new Logger(MessageHandlerService.name);
  private readonly tagger = new Tagger();
  private readonly lexer = new Lexer();
  constructor(
    @InjectRepository(DiscordMessage)
    private repository: Repository<DiscordMessage>,
  ) { }

  async saveMessage(message: DiscordMessage): Promise<DiscordMessage> {
    //filter botdiscord tag
    const discordIdRegBotTag = /<@.?[0-9]*?> /g
    const discordIdUserRegBot = /<@.?[0-9]*?>/g

    message.message = message.message.replace(discordIdRegBotTag, "")
    message.message = message.message.replace(discordIdUserRegBot, "Discordusername")

    if (message.intent == undefined && message.context == undefined) {
      const sentence = new Intent(message.message)

      const intent = sentence.getIntent();
      const context = sentence.getContext();

      message.intent = intent != undefined ? intent : randomUUID()
      message.context = context != undefined ? context : randomUUID()
    }

    return await this.repository.save(message);
  }

  async getMessageByMinId(minId: string): Promise<DiscordMessage> {
    return await this.repository
      .createQueryBuilder("discord_message")
      .where(`minId = :minId`, { minId: minId })
      .getOne();
  }

  async updateMessage(message: DiscordMessage): Promise<void> {
    this.repository.save(message)
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(): Promise<DiscordMessage[]> {
    return await this.repository.find();
  }

  private removeDuplicatedMessages(arr: DiscordMessage[]): DiscordMessage[] {
    return arr.filter((value, index, self) =>
      index === self.findIndex((o) => (
        o.message.toLowerCase() == value.message.toLowerCase()
      ))
    )
  }

  private findMessagesThenFill(arr: string[], arr2: DiscordMessage[]) {
    arr2.forEach(message => {
      if (arr.find(i => i == message.intent + message.context) == undefined) {
        arr.push(message.intent + message.context)
      }
    });
  }

  async getAiData(): Promise<any> {
    const discordMessages = await this.getAll();

    const unique = this.removeDuplicatedMessages(discordMessages);

    const intentsString: string[] = []

    this.findMessagesThenFill(intentsString, unique);

    const intents: IntentDto[] = []

    intentsString.forEach(intent => {
      const messages: DiscordMessage[] = unique.filter(m => m.intent + m.context == intent)

      const patterns: string[] = [];
      const responses: string[] = [];

      messages.forEach(message => {
        patterns.push(message.message);
        if (message.response != undefined && message.response != '') {
          responses.push(message.response);
        }
      });

      if (patterns.length > 0 && responses.length > 0) {
        intents.push(new IntentDto(intent, patterns, responses))
      }
    });

    return intents;
  }

  async getMessageWithoutResponse(): Promise<DiscordMessage> {
    const message = await this.repository
      .createQueryBuilder("discord_message")
      .where(`response = ''`)
      .andWhere(`minId = ''`)
      .getOne();

    console.log(message)

    if (message != undefined) {
      message.minId = this.getRandomMinId();
      let dublicate = true;
      while (dublicate) {
        message.minId = this.getRandomMinId();
        if (await await this.repository
          .createQueryBuilder("discord_message")
          .andWhere(`minId = :minId`, { minId: message.minId })
          .getOne() == undefined) {
          dublicate = false;
        }
      }

      return await this.repository.save(message);
    }

    return undefined;
  }

  getRandomMinId(): string {
    return `${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}${randomInt(9)}`
  }

  async resetMessageMiniIds(): Promise<void> {
    const messages = await this.repository
      .createQueryBuilder("discord_message")
      .where(`response = ''`)
      .andWhere(`minId != ''`)
      .getMany();

    messages.forEach(async message => {
      message.minId = '';
      await this.repository.save(message)
    });
  }

}

