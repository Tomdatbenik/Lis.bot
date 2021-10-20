import { Injectable, Logger } from '@nestjs/common';
import {
  Once,
  DiscordClientProvider,
  Client,
  ClientProvider,
  OnCommand,
  On,
  UsePipes,
  TransformPipe,
  Content,
  Context,
} from 'discord-nestjs';
import { Message, TextChannel } from 'discord.js';
import { BotService } from './bot.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly botservice: BotService) {}

  @Client()
  discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }

  @OnCommand({ name: 'avatar' })
  @UsePipes(TransformPipe)
  async onCommand(
    @Content() content: UserDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    if (content.user) {
      if (content.user.avatarURL() != null) {
        await context.reply(`User avatar: ${content.user.avatarURL()}`);
      } else {
        await context.reply(`${content.user.username} UPLOAD A PICTURE!! AAA`);
      }
    } else {
      await context.reply(`I need a @user.`);
    }
  }

  @OnCommand({ name: 'test' })
  async onTestCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);

    const client = this.discordProvider.getClient();

    // const channel = await client.channels.fetch(message.channelId);
    // (channel as TextChannel).send('test');

    const test = await this.botservice.getHello(message.content);
    console.log(test);
  }

  @OnCommand({ name: 'weather' })
  async onWeatherCommand(message: Message): Promise<void> {
    await message.reply(`Should get the weather :3: ${message.content}`);
  }

  @OnCommand({ name: 'forecast' })
  async onForecastCommand(message: Message): Promise<void> {
    await message.reply(`Should get the forecast :3: ${message.content}`);
  }

  @OnCommand({ name: 'friday?' })
  async onFridayCommand(message: Message): Promise<void> {
    await message.reply(
      `When will it be friday hmmm who knows :3: ${message.content}`,
    );
  }

  @OnCommand({ name: 'today' })
  async onDayCommand(message: Message): Promise<void> {
    await message.reply(
      `What is today are we today is u today? :3: ${message.content}`,
    );
  }
}
