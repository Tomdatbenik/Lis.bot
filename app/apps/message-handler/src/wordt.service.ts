import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Word from 'apps/common/entities/word-entity';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);

  constructor(
    @InjectRepository(Word)
    private repository: Repository<Word>,
  ) {}

  async saveWords(message: DiscordMessage): Promise<void> {
    const words = message.message.split(' ');

    words.forEach(async (w) => {
      const word: Word = await this.findWord(w);

      if (word) {
        this.logger.log(`Found ${word.word}`);
        word.used += 1;
        this.repository.save(word);
        this.logger.log(`updated ${word.word}`);
      } else {
        const newWord = new Word(w);
        await this.repository.save(newWord);
        this.logger.log(`Saved ${newWord.word}`);
      }
    });
  }

  async findWord(word: string): Promise<Word> {
    return await this.repository
      .createQueryBuilder('word')
      .where('word.word = :word', { word: `${word}` })
      .getOne();
  }
}
