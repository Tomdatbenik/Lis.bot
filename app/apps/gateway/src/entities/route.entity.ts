export class RouteList {
  routes: Route[] = [
    new MessageHandlerRoute(),
    new WeatherServiceRoute(),
    new AIServiceRoute(),
    new BotServiceRoute(),
    new ChannelServiceRoute()
  ];
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

export class AIServiceRoute extends Route {
  constructor() {
    super();
    this.name = process.env.AI;
    this.url = process.env.AI_URL;
  }
}

export class ChannelServiceRoute extends Route {
  constructor() {
    super();
    this.name = process.env.CHANNEL;
    this.url = process.env.CHANNEL_URL;
  }
}

export class BotServiceRoute extends Route {
  constructor() {
    super();
    this.name = process.env.BOT;
    this.url = process.env.BOT_URL;
  }
}
