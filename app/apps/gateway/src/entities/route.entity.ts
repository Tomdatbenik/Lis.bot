export class RouteList {
  routes: Route[] = [
    new ProjectRoute(),
    new ChainRoute(),
    new MESSAGE_HANDLER(),
    new ApiRoute(),
    new ActionRoute(),
  ];
}

export class Route {
  name: string;
  url: string;
}

export class MESSAGE_HANDLER extends Route {
  constructor() {
    super();
    this.name = process.env.MESSAGE_HANDLER;
    this.url = process.env.MESSAGE_HANDLER_URL;
  }
}
export class ProjectRoute extends Route {
  constructor() {
    super();
    this.name = process.env.PROJECT_SERVICE_NAME;
    this.url = process.env.PROJECT_SERVICE_URL;
  }
}

export class ChainRoute extends Route {
  constructor() {
    super();
    this.name = process.env.CHAIN_SERVICE_NAME;
    this.url = process.env.CHAIN_SERVICE_URL;
  }
}

export class ApiRoute extends Route {
  constructor() {
    super();
    this.name = process.env.API_SERVICE_NAME;
    this.url = process.env.API_SERVICE_URL;
  }
}
export class ActionRoute extends Route {
  constructor() {
    super();
    this.name = process.env.ACTION_SERVICE_NAME;
    this.url = process.env.ACTION_SERVICE_URL;
  }
}
