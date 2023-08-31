import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

const swagger = SwaggerHandler.getInstance();

const carouselAPI = {
  [routes.api + routes.carousel]: {
    get: {
      tags: ["Carousel"],
      summary: "캐러셀 이미지와 그레이스케일 값 조회",
      description:
        "캐러셀에 사용되는 모든 이미지와 해당 이미지의 평균 그레이스케일 값을 조회합니다.",
      responses: {
        200: {
          description: "정상적으로 이미지 정보가 반환됨",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    imageName: { type: "string" },
                    grayscaleValue: { type: "number" },
                    imageUrl: { type: "string" },
                  },
                  example: {
                    imageName: "노들섬",
                    grayscaleValue: 204.1861922708333,
                    imageUrl: "/carousel/노들섬.png"
                  },
                },
              },
            },
          },
        },
        500: {
          description: "서버 에러",
        },
      },
    },
    post: {
      tags: ["Carousel"],
      summary: "캐러셀 이미지 업로드",
      description:
        "캐러셀에 사용할 새로운 이미지를 업로드합니다. 관리자 권한 필요.",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "업로드할 이미지",
                },
                name: {
                  type: "string",
                  description: "이미지의 이름",
                },
              },
              required: ["image", "name"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "정상적으로 이미지 업로드 성공",
        },
        400: {
          description: "잘못된 요청",
        },
        500: {
          description: "서버 에러",
        },
      },
    },
  },
};

swagger.addAPI(carouselAPI);
