import { Module } from '@nestjs/common';
import {
  DiscordModule,
  DiscordModuleOption,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';
import { Intents } from 'discord.js';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRoot({
      token: process.env.BOT_TOKEN,
      commandPrefix: '!',
      // allowGuilds: ['745366351929016363'],
      // denyGuilds: [''],
      // allowCommands: [
      //   {
      //     name: 'test',
      //     // channels: ['745366352386326572'],
      //     // users: ['261863053329563648'],
      //     channelType: ['dm'],
      //   },
      // ],
      // webhook: {
      //   webhookId: 'your_webhook_id',
      //   webhookToken: 'your_webhook_token',
      // },
      usePipes: [TransformPipe, ValidationPipe],
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
      ],

      // and other discord options
    } as DiscordModuleOption),
  ],
  controllers: [BotController],
  providers: [BotService, BotGateway],
})
export class BotModule {}
