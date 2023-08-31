class SwaggerHandler {
  private static instance: SwaggerHandler;
  private paths: any[];

  private constructor() {
    this.paths = [];
  }

  public static getInstance(): SwaggerHandler {
    if (!SwaggerHandler.instance) {
      SwaggerHandler.instance = new SwaggerHandler();
    }
    return SwaggerHandler.instance;
  }

  addAPI(apiPath: object) {
    this.paths.push(apiPath);
  }

  getAPI() {
    return this.paths;
  }
}

export default SwaggerHandler;
