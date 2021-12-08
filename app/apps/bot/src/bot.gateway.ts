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
import { weatherInputDto } from './dto/weatherInput.dto';

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

  //#region simple stuff
  @OnCommand({ name: 'avatar' })
  @UsePipes(TransformPipe)
  async onCommand(
    @Content() content: UserDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await context.reply(this.botservice.getAvatar(content));
  }
  //#endregion

  //#region test
  @OnCommand({ name: 'test' })
  async onTestCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);

    const client = this.discordProvider.getClient();

    // const channel = await client.channels.fetch(message.channelId);
    // (channel as TextChannel).send('test');

    const test = await this.botservice.getHello(message.content);
    console.log(test);
  }
  //#endregion

  //#region Weather
  @OnCommand({ name: 'weather' })
  async onWeatherCommandEnglish(
    @Content() content: weatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'weer', prefix: '' })
  async onWeatherCommandDutch(
    @Content() content: weatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'w', prefix: '' })
  async onWeatherCommandShort(
    @Content() content: weatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'forecast' })
  async onForecastCommand(
    @Content() content: weatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }
  //#endregion

  //#region Day
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
  //#endregion

  @On({ event: 'message' })
  async onMessage(@Context() [context]: [Message]): Promise<void> {
    if (context.mentions.users.get('886890896925290496')) {
      if (context.content.length > 255) {
        await context.reply("Me be baka, I can't handle this! (─‿‿─)");
      }
      this.botservice.saveMessage(context);
      await context.reply(await this.botservice.chat(context.content));
    }
  }
}
