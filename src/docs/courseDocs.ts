import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

import { definitions } from "./swaggerDefinitions";

const swagger = SwaggerHandler.getInstance();

const courseRoutesAPI = {
  [routes.api + routes.course + routes.userid]: {
    get: {
      tags: ["Course"],
      summary: "해당 유저가 등록한 코스 조회",
      description: "해당 유저가 등록한 코스들의 정보를 가져옵니다.",
      responses: {
        200: {
          description: "정상적으로 모든 코스 정보가 반환됨",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Course",
                },
              },
              example: [
                {
                  _id: "652940cccf5b9e259fd9c006",
                  user: "64ccd2ac5ee88918645928e2",
                  places: [
                    "652242f77b34f7b01eb2781a",
                    "64e301bf1e636c9e53de3431",
                  ],
                  travelTime: [30],
                  totalFee: 0,
                  isRecommended: false,
                  __v: 0,
                },
                {
                  _id: "652940cccf5b9e259fd9c006",
                  user: "64ccd2ac5ee88918645928e2",
                  places: [
                    "652242f77b34f7b01eb2781a",
                    "64e301bf1e636c9e53de3431",
                  ],
                  travelTime: [50],
                  totalFee: 10000,
                  isRecommended: false,
                  __v: 0,
                },
              ],
            },
          },
        },
        400: {
          description: "잘못된 요청입니다.",
        },
        404: {
          description: "해당 되는 코스 정보를 찾지 못했습니다.",
        },
        500: {
          description: "서버 에러",
        },
      },
    },
    post: {
      tags: ["Course"],
      summary: "해당 유저가 생성한 코스 등록",
      description: "해당 유저가 생성한 코스를 DB에 등록합니다.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              message: "코스가 성공적으로 추가되었습니다.",
              course: {
                user: "64ccd2ac5ee88918645928e2",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [30],
                totalFee: 0,
                isRecommended: false,
                _id: "652954d9a9298f7e5a4c83cd",
                __v: 0,
              },
            },
          },
        },
        required: true,
        description: "유저가 생성한 코스 정보",
      },
      responses: {
        200: {
          description: "코스가 성공적으로 추가되었습니다.",
        },
        400: {
          description: "유효하지 않은 장소ID입니다.",
        },
        404: {
          description: "해당하는 유저를 찾을 수 없습니다.",
        },
        500: {
          description: "코스를 생성하지 못했습니다",
        },
      },
    },
  },
  [routes.api + routes.course + routes.recommended + routes.userid]: {
    get: {
      tags: ["Course"],
      summary: "추천 코스 조회",
      description: "추천 코스들의 정보를 가져옵니다.",
      responses: {
        200: {
          description: "정상적으로 모든 추천 코스 정보가 반환됨",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Course",
                },
              },
              example: [
                {
                  _id: "652940cccf5b9e259fd9c006",
                  user: "64ccd2ac5ee88918645928e2",
                  places: [
                    "652242f77b34f7b01eb2781a",
                    "64e301bf1e636c9e53de3431",
                  ],
                  travelTime: [30],
                  totalFee: 0,
                  isRecommended: true,
                  __v: 0,
                },
                {
                  _id: "652940cccf5b9e259fd9c006",
                  user: "64ccd2ac5ee88918645928e2",
                  places: [
                    "652242f77b34f7b01eb2781a",
                    "64e301bf1e636c9e53de3431",
                  ],
                  travelTime: [50],
                  totalFee: 10000,
                  isRecommended: true,
                  __v: 0,
                },
              ],
            },
          },
        },
        400: {
          description: "잘못된 요청입니다.",
        },
        404: {
          description: "해당 되는 코스 정보를 찾지 못했습니다.",
        },
        500: {
          description: "서버 에러",
        },
      },
    },
    post: {
      tags: ["Course"],
      summary: "추천 코스 등록",
      description: "추천 코스를 DB에 등록합니다.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              message: "코스가 성공적으로 추가되었습니다.",
              course: {
                user: "64ccd2ac5ee88918645928e2",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [30],
                totalFee: 0,
                isRecommended: true,
                _id: "652954d9a9298f7e5a4c83cd",
                __v: 0,
              },
            },
          },
        },
        required: true,
        description: "관리자가 생성한 추천 코스 정보",
      },
      responses: {
        200: {
          description: "코스가 성공적으로 추가되었습니다.",
        },
        400: {
          description: "유효하지 않은 장소ID입니다.",
        },
        404: {
          description: "해당하는 유저를 찾을 수 없습니다.",
        },
        500: {
          description: "코스를 생성하지 못했습니다",
        },
      },
    },
  },

  components: {
    schemas: definitions,
  },
};

swagger.addAPI(courseRoutesAPI);
