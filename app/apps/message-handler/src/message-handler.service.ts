import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Tagger, Lexer } from 'pos';


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

    return await this.repository.save(message);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(): Promise<DiscordMessage[]> {
    return await this.repository.find();
  }
}
