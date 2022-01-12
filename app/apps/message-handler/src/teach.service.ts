import { HttpService, Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Channel from 'apps/common/entities/channel.entity';
import { MessageHandlerService } from './message-handler.service';

@Injectable()
export class TeachService {
  private readonly logger = new Logger(TeachService.name);
  private httpService = new HttpService();
  constructor(
    @InjectRepository(DiscordMessage)
    private repository: Repository<DiscordMessage>,
    private readonly messageHandlerService: MessageHandlerService,
  ) { }

  async getAiChannels(): Promise<Channel[]> {
    const channels: Channel[] = await this.httpService
      .request({
        url: `http://localhost:8079/${process.env.CHANNEL}/ai`,
        method: 'get',
      })
      .toPromise()
      .then((result) => {
        return result.data as Channel[];
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

    return channels;
  }

  async sendResponseRequest(): Promise<void> {
    const channels = await this.getAiChannels();

    channels.forEach(async channel => {
      const message = await this.messageHandlerService.getMessageWithoutResponse();

      if (message != undefined) {
        message.message = "How would you respond to the message: \"" + message.message + "\"? \n" +
          'respond with: !teach ' + message.minId + ' *your anwser*'

        await this.httpService
          .request({
            url: `http://localhost:8079/${process.env.BOT}/send/${channel.id}`,
            method: 'post',
            data: message
          })
          .toPromise()
          .catch((err) => {
            this.logger.log(err);
          });
      }
    });
  }
}
