import { Body, Controller, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import Channel from 'apps/common/entities/channel.entity';
import { ChannelAITypes } from 'apps/common/enums/channelAITypes.enum';
import { ChannelTypes } from 'apps/common/enums/channelTypes.enum';
import BadRequestException from 'apps/common/exeptions/badRequest.exception';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  private logger = new Logger(ChannelController.name);

  @Get('/one')
  async findOneMin(@Query('id') id): Promise<Channel> {
    return await this.channelService.findOne(id);
  }

  @Get("/ai")
  async getAiChannels(): Promise<Channel[]> {
    return await this.channelService.findAiChannels();
  }

  @Post()
  async saveChannel(
    @Body() channel: Channel,
  ): Promise<Channel> {
    Logger.log(
      `saving channel ${channel.id}, type: ${channel.type}.`,
    );

    return await this.channelService.saveChannel(channel);
  }

  @Put("/ai")
  async toggleAI(
    @Query('id') id
  ): Promise<Channel> {

    if (!id) throw new BadRequestException();

    Logger.log(`started togling for channel ${id}.`,);

    let channel = await this.channelService.findOne(id);

    if (!channel) {
      channel = new Channel(id)
      channel.learn = ChannelAITypes.LEARN;
      channel.type = ChannelTypes.TEXT;
      return await this.channelService.saveChannel(channel);
    }

    channel.learn != ChannelAITypes.LEARN ? channel.learn = ChannelAITypes.LEARN : channel.learn = ChannelAITypes.NONE;

    return await this.channelService.updateChannel(channel);
  }

  @Put()
  async updateChannel(
    @Body() channel: Channel,
  ): Promise<Channel> {
    Logger.log(
      `updating channel ${channel.id}, type: ${channel.type}.`,
    );

    return await this.channelService.updateChannel(channel);
  }

}
