import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ChannelModule } from './channel.module';

async function bootstrap() {
  const app = await NestFactory.create(ChannelModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.CHANNEL_HANDLER_PORT);
  const logger = new Logger('NestApplication');
  logger.log(`Message handler is running on: ${await app.getUrl()}`);
}
bootstrap();
