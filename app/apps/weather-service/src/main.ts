import { NestFactory } from '@nestjs/core';
import { WeatherServiceModule } from './weather-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WeatherServiceModule);
  await app.listen(3000);
}
bootstrap();
