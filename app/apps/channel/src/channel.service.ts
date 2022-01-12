import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Channel from 'apps/common/entities/channel.entity';
import { ChannelAITypes } from 'apps/common/enums/channelAITypes.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private repository: Repository<Channel>,
  ) { }

  private readonly logger = new Logger(ChannelService.name);

  async updateChannel(channel: Channel): Promise<Channel> {
    return await this.repository.save(channel);
  }

  async saveChannel(channel: Channel): Promise<Channel> {
    return await this.repository.save(channel);
  }

  async findOne(id: string): Promise<Channel> {
    return await this.repository
      .findOne(id)
      .then(async (project) => {
        return project;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async findAiChannels(): Promise<Channel[]> {
    return await this.repository.find({ learn: ChannelAITypes.LEARN });
  }

}
