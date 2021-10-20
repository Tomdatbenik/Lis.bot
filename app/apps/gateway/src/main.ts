import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.GATEWAY_PORT);
  const logger = new Logger('NestApplication');
  logger.log(`Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
