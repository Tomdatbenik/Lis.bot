import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/models/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Word from 'apps/common/models/word-entity';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);

  constructor(
    @InjectRepository(DiscordMessage)
    private repository: Repository<Word>,
  ) {}

  async saveWords(message: DiscordMessage): Promise<void> {
    message.message.split(' ').forEach(async (w) => {
      const word = await this.findWord(w)[0];

      if (word) {
        this.logger.log(`Found ${word.word}`);
        word.used += 1;
        this.repository.save(word);
        this.logger.log(`updated ${word}`);
      } else {
        await this.repository.save(word);
        this.logger.log(`Saved ${word.word}`);
      }
    });
  }

  async findWord(word: string): Promise<Word[]> {
    return await this.repository.find({ where: { word: word.toLowerCase() } });
  }
}
