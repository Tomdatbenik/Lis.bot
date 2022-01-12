import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import { Dictionary } from 'apps/common/dto/dictionary.dto';
import ResponseDto from 'apps/common/dto/response.dto';
import { weatherDTO } from 'apps/common/dto/weather.dto';
import Channel from 'apps/common/entities/channel.entity';
import DiscordMessage from 'apps/common/entities/message.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);
  private httpService = new HttpService();

  async getHello(message: string): Promise<string> {
    const response = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/`,
        method: 'get',
        params: {
          message: message,
        },
      })
      .toPromise()
      .catch((result) => {
        if (result.response) {
          throw new HttpException(
            result.response.data.message,
            result.response.data.statusCode,
          );
        }

        this.logger.error(result);
      });
    return 'Hello World!';
  }

  async saveMessage(context: any): Promise<DiscordMessage> {
    const discordMessage: DiscordMessage = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/`,
        method: 'post',
        data: new DiscordMessage(
          context.content,
          context.author.id,
          context.author.username,
        ),
      })
      .toPromise()
      .then((result) => {
        return result.data as DiscordMessage;
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);

        return new DiscordMessage('');
      });

    return discordMessage;
  }

  async saveDictionaryMessage(message: DiscordMessage): Promise<DiscordMessage> {
    const discordMessage: DiscordMessage = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/`,
        method: 'post',
        data: message,
      })
      .toPromise()
      .then((result) => {
        return result.data as DiscordMessage;
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);

        return new DiscordMessage('');
      });

    return discordMessage;
  }

  async giveResponse(minId: string, response: string): Promise<void> {
    await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/response`,
        method: 'post',
        data: new ResponseDto(minId, response),
      })
      .toPromise()
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);
      });
  }

  getAvatar(content: UserDto): string {
    if (content.user) {
      if (content.user.avatarURL() != null) {
        return `User avatar: ${content.user.avatarURL()}`;
      } else {
        return `${content.user.username} UPLOAD A PICTURE!! AAA`;
      }
    } else {
      return `I need a @user.`;
    }
  }

  async getTodaysWeather(location: string): Promise<string> {
    if (location == '' || location == undefined) {
      return "I can't look up weather if you don't give me a location :P";
    }

    const weather: weatherDTO = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.WEATHER}/`,
        method: 'get',
        params: {
          location: location,
        },
      })
      .toPromise()
      .then((result) => {
        return result.data as weatherDTO;
      })
      .catch((err) => {
        console.log(err);
        return new weatherDTO();
      });

    return this.getCurrentWeatherMessage(weather, location);
  }

  getCurrentWeatherMessage(weather: weatherDTO, location: string): string {
    if (weather.current == undefined || !weather.location == undefined) {
      return `Couldn't find the weather in ${location}. I'm sawrry :3`;
    }

    const degreetype = weather.location.degreetype;

    return `On ${weather.current.day} the weather in ${weather.location.name} is: 
    Tempature: ${weather.current.temperature} ${degreetype} 
    Feels like: ${weather.current.feelslike} ${degreetype}
    Humidity: ${weather.current.humidity}
    Wind: ${weather.current.winddisplay}
    The sky looks like: ${weather.current.skytext}`;
  }

  async getDictionary(word: string): Promise<Dictionary[]> {
    const dictionaries: Dictionary[] = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/dictionary/`,
        method: 'get',
        params: { word: word },
      })
      .toPromise()
      .then((result) => {
        return result.data as Dictionary[];
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);

        return [];
      });

    return dictionaries;
  }

  async toggleAi(channelId: string): Promise<Channel> {
    const channel: Channel = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.CHANNEL}/ai`,
        method: 'put',
        params: { id: channelId },
      })
      .toPromise()
      .then((result) => {
        return result.data as Channel;
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);
        return null;
      });

    return channel;
  }

  async createBag(): Promise<string[]> {
    const bag: string[] = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.MESSAGE_HANDLER}/createBag`,
        method: 'post',
      })
      .toPromise()
      .then((result) => {
        return result.data as string[];
      })
      .catch((err) => {
        this.logger.error(`Could not save message: ${err}`);

        return [];
      });

    return bag;
  }

  async deleteChannel(id: string): Promise<void> {
    await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.CHANNEL}/one`,
        method: 'delete',
        params: {
          id: id,
        },
      })
      .toPromise()
      .catch((result) => {
        this.logger.error(result);
      });
  }

  async chat(msg): Promise<string> {
    const message = await this.httpService
      .request({
        url: `http://localhost:8079/ai/chat`,
        method: 'post',
        params: {
          msg: msg,
        },
        data: {
          intents: [
            {
              tag: 'age',
              patterns: [
                'how old',
                'how old is tim',
                'what is your age',
                'how old are you',
                'age?',
              ],
              responses: ['I am 18 years old!', '18 years young!'],
              context_set: '',
            },
            {
              tag: 'greeting',
              patterns: [
                'Hi',
                'How are you',
                'Is anyone there?',
                'Hello',
                'Good day',
                'Whats up',
              ],
              responses: [
                'Hello!',
                'Good to see you again!',
                'Hi there, how can I help?',
              ],
              context_set: '',
            },
            {
              tag: 'goodbye',
              patterns: [
                'cya',
                'See you later',
                'Goodbye',
                'I am Leaving',
                'Have a Good day',
              ],
              responses: [
                'Sad to see you go :(',
                'Talk to you later',
                'Goodbye!',
              ],
              context_set: '',
            },
            {
              tag: 'name',
              patterns: [
                'what is your name',
                'what should I call you',
                'whats your name?',
              ],
              responses: [
                'You can call me Tim.',
                "I'm Tim!",
                "I'm Tim aka Tech With Tim.",
              ],
              context_set: '',
            },
            {
              tag: 'shop',
              patterns: [
                'Id like to buy something',
                'whats on the menu',
                'what do you reccommend?',
                'could i get something to eat',
              ],
              responses: [
                'We sell chocolate chip cookies for $2!',
                'Cookies are on the menu!',
              ],
              context_set: '',
            },
            {
              tag: 'hours',
              patterns: [
                'when are you guys open',
                'what are your hours',
                'hours of operation',
              ],
              responses: ['We are open 7am-4pm Monday-Friday!'],
              context_set: '',
            },
            {
              tag: 'test',
              patterns: ['test', 'ping'],
              responses: ['Pong', 'Test complete'],
              context_set: '',
            },
            {
              tag: 'asult',
              patterns: ['Hoe', 'Hoer', 'Cunt', 'Bitch'],
              responses: [
                'No u',
                'Shut your ass up little shit',
                'Your funny, Asshole',
              ],
              context_set: '',
            },
          ],
        },
      })
      .toPromise()
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return "I can't talk right now :(";
      });

    return message;
  }
}
