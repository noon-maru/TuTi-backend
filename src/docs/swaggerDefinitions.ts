export const definitions = {
  Place: {
    type: "object",
    properties: {
      _id: { type: "string", example: "6141d6a726f54729989876a7" },
      region: { type: "string", example: "서울" },
      name: { type: "string", example: "롯데타워" },
      address: { type: "string", example: "서울특별시 송파구 올림픽로 300" },
      latitude: {
        type: "number",
        example: 35.15571143112305,
      },
      longitude: {
        type: "number",
        example: 129.13450507988688,
      },
      image: {
        type: "string",
        example: "/static/photo/JPG/서울특별시/송파구/{이미지 이름}.jpg",
      },
      numberHearts: { type: "integer", format: "int32", example: 100 },
      is_landmark: {
        type: "boolean",
        example: true,
      },
      tags: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Tag",
        },
      },
      tourismInfo: {
        type: "object",
        properties: {
          parkingInfo: { type: "string", example: "주차수용 : 60대 /☆☆★" },
          advice: {
            type: "string",
            example: "모자를 챙겨가시는 걸 추천합니다.",
          },
          admissionFee: { type: "string", example: "5000원" },
          closedDays: {
            type: "array",
            items: {
              type: "string",
            },
          },
          subwayInfo: {
            type: "array",
            items: {
              type: "string",
              example: ["가까운 지하철역: 예시역1", "가까운 지하철역: 예시역2"],
            },
          },
          busInfo: {
            type: "object",
            properties: {
              busRoutes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              busStops: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
  RecommendedPlace: {
    type: "object",
    properties: {
      _id: { type: "string", example: "6141d7b726f54729989878b9" },
      place: { $ref: "#/components/schemas/Place" },
    },
  },
  Tag: {
    type: "object",
    properties: {
      _id: { type: "string", example: "6141d8a726f54729989879c2" },
      tagName: { type: "string", example: "관광지" },
      associatedCount: { type: "integer", format: "int32", example: 150 },
      relatedTags: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Tag",
        },
      },
    },
  },
  Course: {
    type: "object",
    properties: {
      _id: { type: "string", example: "6141d8a726f54729989879c2" },
      courseName: { type: "string", example: "맑은 날 한강공원 나들이" },
      user: { $ref: "#/components/schemas/User" },
      places: { type: "array", items: { $ref: "#/components/schemas/Place" } },
      recordImages: { type: "array", items: "string" },
      travelTime: { type: "integer", example: 30 },
      totalFee: { type: "integer", example: 10000 },
      isProgress: { type: "boolean", example: false },
      isRecommended: { type: "boolean", example: true },
    },
  },
};
