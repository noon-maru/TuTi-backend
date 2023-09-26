import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

const swagger = SwaggerHandler.getInstance();

const placeRoutesAPI = {
  [routes.api + routes.place]: {
    get: {
      tags: ["Place"],
      summary: "모든 장소 조회",
      description: "모든 장소의 정보를 가져옵니다.",
      responses: {
        "200": {
          description: "성공적으로 장소 정보를 가져옴",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
    post: {
      tags: ["Place"],
      summary: "장소 생성",
      description: "새로운 장소를 생성합니다.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                region: {
                  type: "string",
                  example: "부산",
                },
                name: {
                  type: "string",
                  example: "민락수변공원",
                },
                address: {
                  type: "string",
                  example: "부산광역시 수영구 광안해변로 361",
                },
                latitude: {
                  type: "number",
                  example: 129.13450507988688,
                },
                longitude: {
                  type: "number",
                  example: 35.15571143112305,
                },
                image: {
                  type: "string",
                  example:
                    "/static/photo/JPG/부산광역시/수변공원/FN1A2519-HDR.jpg",
                },
                numberHearts: {
                  type: "integer",
                  example: 47,
                },
                is_landmark: {
                  type: "boolean",
                  example: true,
                },
                tag: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["공원", "해변"],
                },
                tourismInfo: {
                  type: "object", // 관광 정보에 대한 스키마 정의
                  properties: {
                    parkingInfo: {
                      type: "string",
                      example: "주차수용 : 60대 /☆☆★",
                    },
                    advice: {
                      type: "string",
                      example: "모자를 챙겨가시는 걸 추천합니다.",
                    },
                    admissionFee: {
                      type: "string",
                      example: "5000원",
                    },
                    closedDays: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      example: ["월요일", "화요일"],
                    },
                    subwayInfo: {
                      type: "array",
                      items: {
                        type: "string",
                        example: [
                          "가까운 지하철역: 예시역1",
                          "가까운 지하철역: 예시역2",
                        ],
                      },
                    },
                    busInfo: {
                      type: "object", // 버스 정보에 대한 스키마 정의
                      properties: {
                        busRoutes: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: ["101번 버스", "202번 버스"],
                        },
                        busStops: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: ["버스 정류장 A", "버스 정류장 B"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "장소 생성 성공",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  region: {
                    type: "string",
                    example: "부산",
                  },
                  name: {
                    type: "string",
                    example: "민락수변공원",
                  },
                  address: {
                    type: "string",
                    example: "부산광역시 수영구 광안해변로 361",
                  },
                  latitude: {
                    type: "number",
                    example: 129.13450507988688,
                  },
                  longitude: {
                    type: "number",
                    example: 35.15571143112305,
                  },
                  image: {
                    type: "string",
                    example:
                      "/static/photo/JPG/부산광역시/수변공원/FN1A2519-HDR.jpg",
                  },
                  numberHearts: {
                    type: "number",
                    example: 47,
                  },
                  is_landmark: {
                    type: "boolean",
                    example: true,
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: [
                      "64e300e91e636c9e53de3422",
                      "64e48f99b85a57f44c5928c0",
                    ],
                  },
                  tourismInfo: {
                    type: "object", // 관광 정보에 대한 스키마 정의
                    properties: {
                      parkingInfo: {
                        type: "string",
                        example: "주차수용 : 60대 /☆☆★",
                      },
                      advice: {
                        type: "string",
                        example: "모자를 챙겨가시는 걸 추천합니다.",
                      },
                      admissionFee: {
                        type: "string",
                        example: "5000원",
                      },
                      closedDays: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: ["월요일", "화요일"],
                      },
                      subwayInfo: {
                        type: "array",
                        items: {
                          type: "string",
                          example: [
                            "가까운 지하철역: 예시역1",
                            "가까운 지하철역: 예시역2",
                          ],
                        },
                      },
                      busInfo: {
                        type: "object", // 버스 정보에 대한 스키마 정의
                        properties: {
                          busRoutes: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                            example: ["101번 버스", "202번 버스"],
                          },
                          busStops: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                            example: ["버스 정류장 A", "버스 정류장 B"],
                          },
                        },
                      },
                    },
                  },
                  _id: {
                    type: "string",
                    example: "64e48f99b85a57f44c5928c3",
                  },
                  __v: {
                    type: "integer",
                    example: 0,
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "이미 존재하는 장소입니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
  },
  [routes.api + routes.place + routes.name + "/:placeName"]: {
    get: {
      tags: ["Place"],
      summary: "이름으로 장소 조회",
      description: "특정 이름의 장소 정보를 가져옵니다.",
      parameters: [
        {
          name: "placeName",
          in: "path",
          description: "조회할 장소의 이름",
          required: true,
          type: "string",
          example: "롯데월드",
        },
      ],
      responses: {
        "200": {
          description: "성공적으로 장소 정보를 가져옴",
        },
        "404": {
          description: "해당 이름의 장소를 찾을 수 없습니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
  },
  [routes.api + routes.place + routes.region + "/:regionName"]: {
    get: {
      tags: ["Place"],
      summary: "지역으로 장소 조회",
      description: "특정 지역의 모든 장소 정보를 가져옵니다.",
      parameters: [
        {
          name: "regionName",
          in: "path",
          description: "조회할 장소의 지역 이름",
          required: true,
          type: "string",
          example: "서울",
        },
      ],
      responses: {
        "200": {
          description: "성공적으로 장소 정보를 가져옴",
        },
        "404": {
          description: "해당 지역의 장소를 찾을 수 없습니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
  },
  [routes.api + routes.place + routes.tag + "/:tag"]: {
    get: {
      tags: ["Place"],
      summary: "태그로 장소 조회",
      description: "특정 태그를 가진 장소들의 정보를 가져옵니다.",
      parameters: [
        {
          name: "tag",
          in: "path",
          description: "조회할 장소의 태그",
          required: true,
          type: "string",
          example: "64d5db8d937fb84d24c8b699",
        },
      ],
      responses: {
        "200": {
          description: "성공적으로 장소 정보를 가져옴",
        },
        "404": {
          description: "해당 태그를 가진 장소를 찾을 수 없습니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
  },
  [routes.api + routes.place + "/:placeId"]: {
    put: {
      tags: ["Place"],
      summary: "장소 업데이트",
      description: "장소 정보를 업데이트 합니다.",
      parameters: [
        {
          name: "placeId",
          in: "path",
          description: "수정할 장소의 ID",
          required: true,
          type: "string",
          example: "60d5dbad9d7fb84d2408b699",
        },
      ],
      responses: {
        "200": {
          description: "장소 업데이트 성공",
        },
        "404": {
          description: "장소를 찾을 수 없습니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
    delete: {
      tags: ["Place"],
      summary: "장소 삭제",
      description: "장소를 삭제합니다.",
      parameters: [
        {
          name: "placeId",
          in: "path",
          description: "삭제할 장소의 ID",
          required: true,
          type: "string",
          example: "60d5dbad9d7fb84d2408b699",
        },
      ],
      responses: {
        "200": {
          description: "장소 삭제 성공",
        },
        "404": {
          description: "장소를 찾을 수 없습니다.",
        },
        "500": {
          description: "서버 오류",
        },
      },
    },
  },
};

swagger.addAPI(placeRoutesAPI);
