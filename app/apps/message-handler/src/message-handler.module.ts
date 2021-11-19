import { Module } from '@nestjs/common';
import { MessageHandlerController } from './message-handler.controller';
import { MessageHandlerService } from './message-handler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DiscordMessage from 'apps/common/models/message.entity';
import { WordService } from './wordt.service';
import Word from 'apps/common/models/word-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MESSAGE_DB_HOST,
      port: process.env.MESSAGE_DB_PORT as unknown as number,
      username: process.env.MESSAGE_DB_USERNAME,
      password: process.env.MESSAGE_DB_PASSWORD,
      database: process.env.MESSAGE_DB_DATABASE,
      entities: [DiscordMessage],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([DiscordMessage, Word]),
  ],
  controllers: [MessageHandlerController],
  providers: [MessageHandlerService, WordService],
})
export class MessageHandlerModule {}
