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
    const discordIdReg = /<@.?[0-9]*?>/g
    message.message = message.message.replace(discordIdReg, "Discordusername")
    message.message = message.message.replace(discordIdReg, "Discordusername")

    if (message.message.split(" ")[0] == "Discordusername") {
      message.message = message.message.replace("Discordusername", "")
    }

    if (message.intent == undefined && message.context == undefined) {
      const sentence = new Intent(message.message)

      const intent = sentence.getIntent();
      const context = sentence.getContext();

      message.intent = intent != undefined ? intent : randomUUID()
      message.context = context != undefined ? context : randomUUID()
    }

    return await this.repository.save(message);
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
    const messages = await this.repository.find({ message: undefined })

    const randomMessage = messages[randomInt(messages.length)]

    randomMessage.minId = this.getRandomMinId();

    while (await this.repository.find({ minId: randomMessage.minId }) != undefined) {
      randomMessage.minId = this.getRandomMinId();
    }

    return await this.repository.save(randomMessage);
  }

  getRandomMinId(): string {
    return `${[randomInt(9)]}${[randomInt(9)]}${[randomInt(9)]}${[randomInt(9)]}${[randomInt(9)]}${[randomInt(9)]}`
  }
}

