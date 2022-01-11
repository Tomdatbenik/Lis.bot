import { Controller, Get, Post } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller()
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  getHello(): string {
    return "hoi";
  }

  @Get("channel")
  channel(): Channel
}
