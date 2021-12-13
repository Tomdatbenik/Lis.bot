import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Word from 'apps/common/entities/word-entity';
import { MessageHandlerService } from './message-handler.service';
import { unwatchFile } from 'fs';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);

  constructor(
    @InjectRepository(Word)
    private repository: Repository<Word>,
    private messageService: MessageHandlerService,
  ) {}

  async saveWords(message: DiscordMessage): Promise<void> {
    const words = message.message.split(' ');
    const saveWords: Word[] = [];
    words.forEach(async (w) => {
      w = w.replace('.', '').replace(',', '');

      const word: Word = await this.findWord(w);

      console.log(word);

      if (word == undefined) {
        saveWords.push(new Word(w));
      }
    });

    console.log('save words = ');
    console.log(saveWords);
    saveWords.forEach(async (w) => {
      await this.repository.save(w);
    });
  }

  async findWord(word: string): Promise<Word> {
    return await this.repository
      .createQueryBuilder('word')
      .where('word.word = :word', { word: `${word}` })
      .getOne();
  }

  async bag(): Promise<number[]> {
    const words = await this.repository.find();
    return [];
  }

  async createBag() {
    await this.repository.clear();

    const messages = await this.messageService.getAll();

    const saveWords: Word[] = [];

    messages.forEach(async (message) => {
      const words = message.message.split(' ');
      words.forEach(async (w) => {
        w = w.replace('.', '').replace(',', '');

        const word: Word = saveWords.find((word) => word.word == w);

        if (word == undefined && w != '') {
          saveWords.push(new Word(w));
        }
      });
    });

    console.log('save words = ');
    console.log(saveWords);
    saveWords.forEach(async (w) => {
      await this.repository.save(w);
    });
  }
}
