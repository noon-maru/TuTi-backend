export const definitions = {
  Place: {
    type: "object",
    properties: {
      _id: { type: "string", example: "6141d6a726f54729989876a7" },
      region: { type: "string", example: "서울" },
      name: { type: "string", example: "롯데타워" },
      address: { type: "string", example: "서울특별시 송파구 올림픽로 300" },
      image: {
        type: "string",
        example: "/static/photo/JPG/서울특별시/송파구/{이미지 이름}.jpg",
      },
      numberHearts: { type: "integer", format: "int32", example: 100 },
      tags: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Tag",
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
};
