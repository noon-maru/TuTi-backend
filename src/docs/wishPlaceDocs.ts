import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

const swagger = SwaggerHandler.getInstance();

const wishPlaceRoutesAPI = {
  [routes.api + routes.userid + routes.wishplace]: {
    // 유저가 찜한 전체 장소를 가져오는 API
    get: {
      tags: ["WishPlace"],
      summary: "유저가 찜한 전체 장소 조회",
      description: "유저가 찜한 모든 장소의 정보를 가져옵니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "찜한 장소의 정보를 조회하려는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "유저가 찜한 장소 목록을 성공적으로 반환",
        },
        404: {
          description: "찜 한 장소를 찾지 못했습니다.",
        },
        500: {
          description: "찜 한 장소를 가져오지 못했습니다.",
        },
      },
    },
    post: {
      tags: ["WishPlace"],
      summary: "유저가 찜한 장소 추가",
      description: "유저가 찜한 장소를 추가합니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "장소를 찜하려는 사용자의 ID",
          required: true,
          type: "string",
        },
        {
          name: "placeId",
          in: "body",
          description: "찜하려는 장소의 ID",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "장소가 성공적으로 찜되었습니다.",
        },
        400: {
          description: "잘못된 요청입니다.",
        },
        404: {
          description: "사용자 또는 장소를 찾을 수 없습니다.",
        },
        500: {
          description: "서버 오류",
        },
      },
    },
  },
  [routes.api + routes.userid + routes.wishplace + "/random"]: {
    // 유저가 찜한 장소 중 랜덤한 3개를 가져오는 API
    get: {
      tags: ["WishPlace"],
      summary: "유저가 찜한 장소 중 랜덤 3개 조회",
      description: "유저가 찜한 장소 중 랜덤으로 3개의 장소 정보를 가져옵니다.",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "랜덤으로 찜한 장소의 정보를 조회하려는 사용자의 ID",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "랜덤으로 선택된 유저의 찜한 장소 3개를 성공적으로 반환",
        },
        404: {
          description: "찜 한 장소를 찾지 못했습니다.",
        },
        500: {
          description: "찜 한 장소를 가져오지 못했습니다.",
        },
      },
    },
  },
};

swagger.addAPI(wishPlaceRoutesAPI);
