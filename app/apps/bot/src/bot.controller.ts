import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import DiscordMessage from 'apps/common/entities/message.entity';
import { BotGateway } from './bot.gateway';

@Controller()
export class BotController {
  constructor(private readonly gateway: BotGateway) { }

  @Post("send/:id")
  async sendMessage(@Param('id') id, @Body() message: DiscordMessage): Promise<void> {
    console.log(message)
    console.log(id)
    await this.gateway.sendMessage(message, id)
  }
}
