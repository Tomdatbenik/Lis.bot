import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeatherServiceService } from './weather-service.service';

@Controller()
export class WeatherServiceController {
  constructor(private readonly weatherServiceService: WeatherServiceService) {}

  @Get()
  async getWeather(@Query('location') location: string): Promise<any> {
    return await this.weatherServiceService.getWeather(location);
  }
}
