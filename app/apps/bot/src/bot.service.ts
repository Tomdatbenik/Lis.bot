import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import { weatherDTO } from 'apps/common/dto/weather.dto';
import DiscordMessage from 'apps/common/models/message.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);
  private httpService = new HttpService();

  async getHello(message: string): Promise<string> {
    const response = await this.httpService
      .request({
        url: `http://localhost:8079/message-handler/`,
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
        url: `http://localhost:8079/message-handler/`,
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
        url: `http://localhost:8079/weather/`,
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
}
