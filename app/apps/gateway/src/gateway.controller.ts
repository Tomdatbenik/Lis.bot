import {
  All,
  Body,
  Controller,
  Logger,
  NotFoundException,
  Param,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RouteList } from './entities/route.entity';
import NotFound from './exeptions/notFound.exception';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  private routeList: RouteList = new RouteList();
  private logger = new Logger(GatewayController.name);

  // @UseGuards(AuthGuard('jwt'))
  @All('*')
  async proxy(
    @Param() params: string,
    @Req() request: Request,
    @Body() body: any,
    @Query() query: string,
  ): Promise<any> {
    const service = params[0].split('/')[0];

    const route = this.routeList.routes.find((r) => r.name === service);

    if (!route) {
      throw new NotFound();
    }

    const endpoint = params[0].replace(`${service}/`, '');

    const result = await this.gatewayService.call(
      request.method,
      request.headers,
      route.url,
      endpoint,
      query,
      body,
    );

    return result;
  }
}
