import { Test, TestingModule } from '@nestjs/testing';
import { MessageHandlerController } from './message-handler.controller';
import { MessageHandlerService } from './message-handler.service';

describe('MessageHandlerController', () => {
  let messageHandlerController: MessageHandlerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageHandlerController],
      providers: [MessageHandlerService],
    }).compile();

    messageHandlerController = app.get<MessageHandlerController>(MessageHandlerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(messageHandlerController.getHello()).toBe('Hello World!');
    });
  });
});
