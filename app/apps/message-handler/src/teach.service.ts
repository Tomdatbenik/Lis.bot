import { HttpService, Injectable, Logger } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Channel from 'apps/common/entities/channel.entity';

@Injectable()
export class TeachService {
  private readonly logger = new Logger(TeachService.name);
  private httpService = new HttpService();
  constructor(
    @InjectRepository(DiscordMessage)
    private repository: Repository<DiscordMessage>,
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
}
