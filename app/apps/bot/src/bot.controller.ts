import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller()
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  getHello(): string {
    return "hoi";
  }
}
