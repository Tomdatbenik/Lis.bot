import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AxiosResponse, Method } from 'axios';
import { Observable } from 'rxjs';
import { RequiredHeaders } from './entities/headers.entity';
import ServiceUnavailable from '../../common/exeptions/serviceUnavailable.exception';

@Injectable()
export class GatewayService {
  constructor(private httpService: HttpService) {}

  private logger = new Logger(GatewayService.name);

  async call(
    method: any,
    headers: any,
    url: string,
    endpoint: string,
    params: any,
    body: any,
  ): Promise<Observable<AxiosResponse<any>>> {
    if (endpoint != '') {
      this.logger.log(`calling to: ${url}/${endpoint}`);
    } else {
      this.logger.log(`calling to: ${url}`);
    }

    const httpService: HttpService = new HttpService();

    const headersDto: RequiredHeaders = new RequiredHeaders(headers);

    const response = await httpService
      .request({
        url: endpoint != '' ? `${url}/${endpoint}` : url,
        method: method,
        headers: headers ? headersDto : null,
        data: body,
        params: params,
      })
      .toPromise()
      .catch((result) => {
        if (result.response) {
          throw new HttpException(
            result.response.data.message,
            result.response.data.statusCode,
          );
        } else {
          //TODO check if 503 is correct, lifecheck the service
          console.log(result);
          throw new ServiceUnavailable(
            `Cannot ${method} /${endpoint}, Service unavailable`,
          );
          //throw new NotFound(`Cannot ${method} /${endpoint}`);
        }
      });

    this.logger.log(`Receved result from: ${url}/${endpoint}`);
    return await response.data;
  }
}
