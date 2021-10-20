import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WeatherServiceModule } from './weather-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WeatherServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.WEATHER_PORT);
  const logger = new Logger('NestApplication');
  logger.log(`Wether service is running on: ${await app.getUrl()}`);
}
bootstrap();
