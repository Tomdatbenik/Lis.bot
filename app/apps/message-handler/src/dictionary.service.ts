import { HttpService, Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Dictionary } from 'apps/common/dto/dictionary.dto';

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);
  private httpService = new HttpService();

  constructor() { }

  async dictionary(word: string): Promise<Dictionary[]> {
    const dictionaries: Dictionary[] = await this.httpService
      .request({
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        method: 'get',
      })
      .toPromise()
      .then((result) => {

        return result.data as Dictionary[];
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);

        return [];
      });

    console.log(dictionaries)
    return dictionaries;
  }
}
