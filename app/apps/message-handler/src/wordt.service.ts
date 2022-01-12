import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Word from 'apps/common/entities/word-entity';
import { MessageHandlerService } from './message-handler.service';
import { Tagger, Lexer } from 'pos';

@Injectable()
export class WordService {
  private readonly logger = new Logger(WordService.name);
  private readonly tagger = new Tagger();
  private readonly lexer = new Lexer();

  constructor(
    @InjectRepository(Word)
    private repository: Repository<Word>,
    private messageService: MessageHandlerService,
  ) { }

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

  async createBag(): Promise<Word[]> {
    await this.repository.clear();

    const messages = await this.messageService.getAll();

    const saveWords: Word[] = [];

    messages.forEach(async (message) => {
      const discordIdReg = /<@.?[0-9]*?>/g

      message.message = message.message.replace(discordIdReg, "Discordusername")
      message.message = message.message.replace(discordIdReg, "Discordusername")

      this.logger.log(`handling message :${message.message}`)

      const words = this.lexer.lex(message.message);
      const taggedWords = this.tagger.tag(words);

      for (let i = 0; i < taggedWords.length; i++) {
        const taggedWord: string[] = taggedWords[i];
        const w = taggedWord[0].toLowerCase();
        const tag = taggedWord[1];

        this.logger.log(`handling word:${w}, tag: ${tag}`)

        const word: Word = saveWords.find((word) => word.word.toLowerCase() == w);

        if (word === undefined) {
          const newWord = new Word(w);
          newWord.tag = tag;
          saveWords.push(newWord);
        }
      }
    });

    saveWords.forEach(async (w) => {
      await this.repository.save(w);
    });

    this.logger.log(`bag contains: ${saveWords.length}`);
    return saveWords;
  }
}
