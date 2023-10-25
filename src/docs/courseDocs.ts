import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

import { definitions } from "./swaggerDefinitions";

const swagger = SwaggerHandler.getInstance();

const courseRoutesAPI = {
  [routes.api + routes.course + routes.userId]: {
    get: {
      tags: ["Course"],
      summary: "해당 유저가 등록한 코스 조회",
      description: "해당 유저가 등록한 코스들의 정보를 가져옵니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "코스를 조회하려하는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
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
                  courseName: "맑은 날 한강공원 나들이",
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
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "코스를 등록하려하는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              course: {
                courseName: "맑은 날 한강공원 나들이",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [30],
                totalFee: 0,
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
        409: {
          description: "이미 등록 된 코스입니다.",
        },
        500: {
          description: "코스를 생성하지 못했습니다",
        },
      },
    },
  },
  [routes.api + routes.course + routes.userId + routes.courseId]: {
    put: {
      tags: ["Course"],
      summary: "해당 유저가 생성한 코스 수정",
      description: "해당 유저가 생성한 코스를 수정합니다.",
      parameters: [
        {
          name: "courseId",
          in: "path",
          description: "수정하려하는 코스의 ID",
          required: true,
          type: "string",
        },
        {
          name: "userId",
          in: "path",
          description: "코스를 수정하려하는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              course: {
                courseName: "맑은 날 한강공원 나들이",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [40],
                totalFee: 20000,
                isProgress: true,
              },
            },
          },
        },
        required: true,
        description: "유저가 수정할 코스 정보",
      },
      responses: {
        200: {
          description: "코스가 성공적으로 추가되었습니다.",
        },
        400: {
          description: "유효하지 않은 장소ID입니다.",
        },
        403: {
          description: "코스를 업데이트할 권한이 없습니다",
        },
        404: {
          description: "해당하는 코스를 찾지 못했습니다.",
        },
        500: {
          description: "코스를 업데이트하지 못했습니다",
        },
      },
    },
    delete: {
      tags: ["Course"],
      summary: "해당 유저가 생성한 코스 삭제",
      description: "해당 유저가 생성한 코스를 삭제합니다.",
      parameters: [
        {
          name: "courseId",
          in: "path",
          description: "수정하려하는 코스의 ID",
          required: true,
          type: "string",
        },
        {
          name: "userId",
          in: "path",
          description: "코스를 수정하려하는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "코스가 성공적으로 삭제되었습니다.",
        },
        400: {
          description: "잘못된 요청입니다.",
        },
        404: {
          description: "해당하는 코스를 찾지 못했습니다.",
        },
        500: {
          description: "코스를 삭제하지 못했습니다",
        },
      },
    },
  },

  [routes.api + routes.course + routes.recommended + routes.userId]: {
    get: {
      tags: ["Course"],
      summary: "추천 코스 조회",
      description: "추천 코스들의 정보를 가져옵니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "추천 코스를 조회하려하는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
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
                  courseName: "맑은 날 한강공원 나들이",
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
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "추천 코스를 등록하려하는 관리자의 ID",
          required: true,
          type: "string",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              course: {
                courseName: "맑은 날 한강공원 나들이",
                user: "64ccd2ac5ee88918645928e2",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [30],
                totalFee: 0,
                isRecommended: true,
                _id: "652954d9a9298f7e5a4c83cd",
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
        409: {
          description: "이미 등록 된 코스입니다.",
        },
        500: {
          description: "코스를 생성하지 못했습니다",
        },
      },
    },
  },

  [routes.api +
  routes.course +
  routes.userimage +
  routes.userId +
  routes.courseId +
  routes.placeId]: {
    post: {
      tags: ["Course"],
      summary: "해당 유저의 코스에 이미지 추가",
      description: "해당 유저의 코스에 이미지를 추가합니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "코스에 이미지를 추가하려는 사용자의 ID",
          required: true,
          type: "string",
        },
        {
          name: "courseId",
          in: "path",
          description: "이미지를 추가하려는 코스의 ObjectID",
          required: true,
          type: "string",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Course",
            },
            example: {
              course: {
                courseName: "맑은 날 한강공원 나들이",
                places: [
                  "652242f77b34f7b01eb2781a",
                  "64e301bf1e636c9e53de3431",
                ],
                travelTime: [40],
                totalFee: 20000,
                isProgress: true,
              },
            },
          },
        },
        required: true,
        description: "유저가 수정할 코스 정보",
      },
      responses: {
        200: {
          description: "코스에 이미지를 성공적으로 업데이트하였습니다.",
        },
        403: {
          description: "코스를 업데이트할 권한이 없습니다",
        },
        404: {
          description: "해당하는 요소를 찾지 못했습니다.",
        },
        500: {
          description: "코스에 이미지를 업데이트하지 못했습니다.",
        },
      },
    },
  },
  [routes.api +
  routes.userimage +
  routes.course +
  routes.userId +
  routes.courseId +
  routes.placeId +
  routes.imageId]: {
    put: {
      tags: ["Course"],
      summary: "해당 유저가 생성한 코스 장소 이미지 수정",
      description: "해당 유저가 생성한 코스장소 이미지를 수정합니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "코스의 이미지를 수정하려는 사용자의 ID",
          required: true,
          type: "string",
        },
        {
          name: "courseId",
          in: "path",
          description: "이미지를 수정하려는 코스의 ObjectID",
          required: true,
          type: "string",
        },
        {
          name: "imageId",
          in: "path",
          description: "수정하려는 이미지의 이름",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "코스에 이미지를 성공적으로 업데이트하였습니다.",
        },
        404: {
          description: "해당하는 요소를 찾지 못했습니다.",
        },
        500: {
          description: "코스에 이미지를 업데이트하지 못했습니다.",
        },
      },
    },
    delete: {
      tags: ["Course"],
      summary: "해당 유저가 생성한 코스 장소 이미지 삭제",
      description: "해당 유저가 생성한 코스 장소 이미지를 삭제합니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "코스의 이미지를 삭제하려는 사용자의 ID",
          required: true,
          type: "string",
        },
        {
          name: "courseId",
          in: "path",
          description: "이미지를 삭제하려는 코스의 ObjectID",
          required: true,
          type: "string",
        },
        {
          name: "imageId",
          in: "path",
          description: "삭제하려는 이미지의 이름",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description:
            "이미지가 성공적으로 삭제되었고, 코스가 업데이트되었습니다.",
        },
        404: {
          description: "해당하는 요소를 찾지 못했습니다.",
        },
        500: {
          description: "이미지를 삭제하거나 코스를 업데이트하지 못했습니다.",
        },
      },
    },
  },

  components: {
    schemas: definitions,
  },
};

swagger.addAPI(courseRoutesAPI);
