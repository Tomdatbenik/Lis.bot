import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class MessageHandlerService {
  private readonly logger = new Logger(MessageHandlerService.name);

  constructor(
    @InjectRepository(DiscordMessage)
    private repository: Repository<DiscordMessage>,
  ) {}

  async saveMessage(message: DiscordMessage): Promise<DiscordMessage> {
    return await this.repository.save(message);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
