import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Dictonairy } from 'apps/common/dto/dictonairy.dto';

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);

  constructor() { }

  async dictionary(word: string): Promise<Dictonairy> {


    return new Dictonairy();
  }
}
