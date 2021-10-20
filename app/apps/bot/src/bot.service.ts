import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);

  private httpService = new HttpService();

  async getHello(message: string): Promise<string> {
    const response = await this.httpService
      .request({
        url: `http://localhost:8079/message-handler/`,
        method: 'get',
        params: {
          message: message,
        },
      })
      .toPromise()
      .catch((result) => {
        if (result.response) {
          throw new HttpException(
            result.response.data.message,
            result.response.data.statusCode,
          );
        }

        this.logger.error(result);
      });
    return 'Hello World!';
  }
}
