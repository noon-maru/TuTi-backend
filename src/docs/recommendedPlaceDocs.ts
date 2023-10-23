import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

import { definitions } from "./swaggerDefinitions";

const swagger = SwaggerHandler.getInstance();

const recommendedPlaceAPI = {
  [routes.api + routes.recommendedplaces]: {
    get: {
      tags: ["RecommendedPlace"],
      summary: "모든 추천 장소 정보 조회",
      description: "시스템에 등록된 모든 추천 장소의 정보를 가져옵니다.",
      responses: {
        200: {
          description: "정상적으로 모든 추천 장소 정보가 반환됨",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/RecommendedPlace",
                },
              },
              example: [
                {
                  _id: "64d8a30611a192dcd638053e",
                  place: {
                    numberHearts: 0,
                    tags: [],
                    _id: "64d8a25911a192dcd638051c",
                    region: "제주",
                    name: "만장굴",
                    address: "제주특별자치도 제주시 구좌읍 만장굴길 182",
                    image: "/static/photo/JPG/제주도/만장굴/IMG_4267.JPG",
                    __v: 0,
                  },
                  __v: 0,
                },
                {
                  _id: "64d8a31311a192dcd6380542",
                  place: {
                    numberHearts: 0,
                    tags: [],
                    _id: "64d8a26e11a192dcd6380520",
                    region: "제주",
                    name: "천지연폭포",
                    address: "제주특별자치도 서귀포시 남성중로 2-15",
                    image: "/static/photo/JPG/제주도/천지연폭포/IMG_2485.JPG",
                    __v: 0,
                  },
                  __v: 0,
                },
              ],
            },
          },
        },
        500: {
          description: "서버 에러",
        },
      },
    },
    post: {
      tags: ["RecommendedPlace"],
      summary: "추천 장소 추가",
      description: "관리자가 새로운 추천 장소를 추가합니다.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                placeId: {
                  type: "string",
                },
              },
            },
            example: {
              placeId: "64d8a26e11a192dcd6380520",
            },
          },
        },
        required: true,
        description: "추천 장소로 등록하려는 장소의 ID",
      },
      responses: {
        200: {
          description: "추천 장소가 정상적으로 추가됨",
        },
        404: {
          description: "해당 장소를 찾을 수 없음",
        },
        500: {
          description: "서버 에러",
        },
      },
    },
  },
  [routes.api +
  routes.recommendedplaces +
  routes.userId +
  "/:recommendedPlaceId"]: {
    delete: {
      tags: ["RecommendedPlace"],
      summary: "추천 장소 제거",
      description: "관리자가 특정 추천 장소를 제거합니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "유저 ID",
          required: true,
          schema: { type: "string" },
          example: "abc1234",
        },
        {
          name: "recommendedPlaceId",
          in: "path",
          description: "제거하려는 추천 장소의 ID",
          required: true,
          schema: { type: "string" },
          example: "64d8a26e11a192dcd6380520",
        },
      ],
      responses: {
        200: {
          description: "추천 장소가 정상적으로 제거됨",
        },
        404: {
          description: "해당 추천 장소를 찾을 수 없음",
        },
        500: {
          description: "서버 에러",
        },
      },
    },
  },

  components: {
    schemas: definitions,
  },
};

swagger.addAPI(recommendedPlaceAPI);
