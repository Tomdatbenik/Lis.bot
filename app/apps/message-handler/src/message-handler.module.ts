import { Module } from '@nestjs/common';
import { MessageHandlerController } from './message-handler.controller';
import { MessageHandlerService } from './message-handler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DiscordMessage from 'apps/common/entities/message.entity';
import { WordService } from './wordt.service';
import Word from 'apps/common/entities/word-entity';
import Intent from 'apps/common/entities/Intent.entity';
import AiData from 'apps/common/entities/aiData.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MESSAGE_DB_HOST,
      port: process.env.MESSAGE_DB_PORT as unknown as number,
      username: process.env.MESSAGE_DB_USERNAME,
      password: process.env.MESSAGE_DB_PASSWORD,
      database: process.env.MESSAGE_DB_DATABASE,
      entities: [DiscordMessage, Word, Intent, AiData],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([DiscordMessage, Word, Intent, AiData]),
  ],
  controllers: [MessageHandlerController],
  providers: [MessageHandlerService, WordService, DictionaryService],
})
export class MessageHandlerModule { }
