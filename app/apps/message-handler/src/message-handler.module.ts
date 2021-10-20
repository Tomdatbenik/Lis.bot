import { Module } from '@nestjs/common';
import { MessageHandlerController } from './message-handler.controller';
import { MessageHandlerService } from './message-handler.service';

@Module({
  imports: [],
  controllers: [MessageHandlerController],
  providers: [MessageHandlerService],
})
export class MessageHandlerModule {}
