import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MessageHandlerModule } from './message-handler.module';

async function bootstrap() {
  const app = await NestFactory.create(MessageHandlerModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  BOT_TOKEN=ODg2ODkwODk2OTI1MjkwNDk2.YT8Lgw.DeYg6m3036PICKlBDI_wQPjjjlQ
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.MESSAGE_HANDLER_PORT);
  const logger = new Logger('NestApplication');
  logger.log(`Message handler is running on: ${await app.getUrl()}`);
}
bootstrap();
