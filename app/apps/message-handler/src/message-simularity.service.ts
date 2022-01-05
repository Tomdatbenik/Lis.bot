import { Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, SelectQueryBuilder } from 'typeorm';
import { Tagger, Lexer } from 'pos';


@Injectable()
export class SimularityService {
  // private readonly logger = new Logger(SimularityService.name);
  // private readonly tagger = new Tagger();
  // private readonly lexer = new Lexer();

  // constructor(
  //   @InjectRepository(DiscordMessage)
  //   private repository: Repository<DiscordMessage>,
  // ) { }

  // async getSimularity(message: DiscordMessage): Promise<number> {
  //   //filter botdiscord tag
  //   const messages = await this.repository.find({ where: { uuid: Not(message.uuid) } });

  //   messages.forEach(message => {

  //   });

  //   return 0;
  // }

  // async getSimular(message: DiscordMessage): Promise<DiscordMessage> {
  //   //filter botdiscord tag
    
  //   return await this.repository.save(message);
  // }
}
