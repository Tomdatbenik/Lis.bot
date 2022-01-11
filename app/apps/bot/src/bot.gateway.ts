import { Injectable, Logger } from '@nestjs/common';
import { Dictionary as Dictionary } from 'apps/common/dto/dictionary.dto';
import DiscordMessage from 'apps/common/entities/message.entity';
import { randomUUID } from 'crypto';
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
import { DictionaryInputDto as DictionaryInputDto } from './dto/dictionaryInput.dto';
import { UserDto } from './dto/user.dto';
import { WeatherInputDto } from './dto/weatherInput.dto';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly botservice: BotService) { }

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
    @Content() content: WeatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'weer', prefix: '' })
  async onWeatherCommandDutch(
    @Content() content: WeatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'w', prefix: '' })
  async onWeatherCommandShort(
    @Content() content: WeatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }

  @OnCommand({ name: 'forecast' })
  async onForecastCommand(
    @Content() content: WeatherInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    await context.reply(
      await this.botservice.getTodaysWeather(content.location),
    );
  }
  //#endregion

  //#region dictionary
  @OnCommand({ name: 'dictionary' })
  async onDictionaryCommand(
    @Content() content: DictionaryInputDto,
    @Context() [context]: [Message],
  ): Promise<void> {

    const dictionaries: Dictionary[] = await this.botservice.getDictionary(content.word);

    let response = 'The word: ' + content.word + ' has ' +
      dictionaries.length + ' ' + (dictionaries.length > 0 ? ' results' : ' result')
      + '\n';

    for (let i = 0; i < dictionaries.length; i++) {
      const dictionary = dictionaries[i];
      response += 'result ' + (i + 1) + ': \n';

      dictionary.meanings.forEach(meaning => {
        meaning.definitions.forEach(definition => {
          response += 'definition: ' + definition.definition + '\n';
          response += definition.example ? 'example: ' + definition.example + '\n \n' : '\n'
        })
      })
    }

    await this.botservice.saveDictionaryMessage(new DiscordMessage(
      context.content,
      context.author.id,
      context.author.username,
      randomUUID(),
      response,
      'dictionary'
    ));

    await context.reply(
      response
    );
  }
  //#endregion

  //#region bag
  @OnCommand({ name: 'bag' })
  async onBagCommand(
    @Context() [context]: [Message],
  ): Promise<void> {
    await this.botservice.saveMessage(context);

    const bag = await this.botservice.createBag();

    await context.reply(
      `${bag.length} `
    );
  }
  //#endregion

  //#region channel test
  @OnCommand({ name: 'channel' })
  async onChannelCommand(
    @Context() [context]: [Message],
  ): Promise<void> {

    console.log(context.channel)

    await context.reply(
      `testing channel data channel: ${context.channel.id}`
    );
  }
  //#endregion

  //#region Day
  @OnCommand({ name: 'friday?' })
  async onFridayCommand(message: Message): Promise<void> {
    await message.reply(
      `When will it be friday hmmm who knows: 3: ${message.content} `,
    );
  }

  @OnCommand({ name: 'today' })
  async onDayCommand(message: Message): Promise<void> {
    await message.reply(
      `What is today are we today is u today ? : 3: ${message.content} `,
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
      const response = await this.botservice.chat(context.content);

      await context.reply(response ? response : "Me be baka, (─‿‿─)");
    }
  }
}
