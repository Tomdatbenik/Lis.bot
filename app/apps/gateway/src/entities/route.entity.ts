export class RouteList {
  routes: Route[] = [new MessageHandlerRoute(), new WeatherServiceRoute()];
}

export class Route {
  name: string;
  url: string;
}

export class MessageHandlerRoute extends Route {
  constructor() {
    super();
    this.name = process.env.MESSAGE_HANDLER;
    this.url = process.env.MESSAGE_HANDLER_URL;
  }
}
export class WeatherServiceRoute extends Route {
  constructor() {
    super();
    this.name = process.env.WEATHER;
    this.url = process.env.WEATHER_URL;
  }
}

// export class ChainRoute extends Route {
//   constructor() {
//     super();
//     this.name = process.env.CHAIN_SERVICE_NAME;
//     this.url = process.env.CHAIN_SERVICE_URL;
//   }
// }

// export class ApiRoute extends Route {
//   constructor() {
//     super();
//     this.name = process.env.API_SERVICE_NAME;
//     this.url = process.env.API_SERVICE_URL;
//   }
// }
// export class ActionRoute extends Route {
//   constructor() {
//     super();
//     this.name = process.env.ACTION_SERVICE_NAME;
//     this.url = process.env.ACTION_SERVICE_URL;
//   }
// }
