import SwaggerHandler from "@handler/swagger";

// import fs from "fs";
// import path from "path";

// const docsDir = path.resolve(__dirname);

// const isDevelopment = process.env.NODE_ENV !== "production";
// const fileExtension = isDevelopment ? ".ts" : ".js";

// fs.readdirSync(docsDir).forEach((file) => {
//   // 환경에 따른 확장자로 파일 로드
//   if (file.endsWith(fileExtension) && file !== `index${fileExtension}`) {
//     require(path.join(docsDir, file)); // ES module이 아닌 CommonJS 스타일로 로드
//   }
// });

import "./carouselDocs";
import "./loginDocs";
import "./placeDocs";
import "./recommendedPlaceDocs";
import "./userDocs";
import "./wishPlaceDocs";
import "./courseDocs";

class ApiDocs {
  private paths: any;

  constructor() {
    this.paths = {};
  }

  init() {
    const apis = SwaggerHandler.getInstance().getAPI();
    for (const api of apis) {
      Object.assign(this.paths, api);
    }
  }

  getSwaggerOption() {
    this.init();

    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "TuTi Swagger",
        version: "1.0.0",
      },
      paths: this.paths,
    };

    return {
      swaggerUI: require("swagger-ui-express"),
      specs: swaggerDefinition,
    };
  }
}

export default ApiDocs;
