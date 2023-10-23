import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

const swagger = SwaggerHandler.getInstance();

const userRoutesAPI = {
  [routes.api + routes.users]: {
    // 전체 유저의 정보를 가져오는 API
    get: {
      tags: ["User"],
      summary: "전체 유저 정보 조회",
      description: "시스템에 등록된 모든 유저의 정보를 가져옵니다.",
      responses: {
        200: {
          description: "정상적으로 모든 유저 정보가 반환됨",
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "OAuth 로그인 시 자동으로 생성되는 id",
                },
                username: {
                  type: "string",
                  description: "각 OAuth 서비스에서 유저 본인이 지정한 이름",
                },
                profile: {
                  type: "string",
                  description:
                    "각 OAuth 서비스에서 유저 본인이 등록한 프로필 사진",
                },
                isAdmin: {
                  type: "boolean",
                  description: "사용자가 관리자인지 여부",
                },
              },
            },
          },
        },
        404: {
          description: "유저 정보들을 찾지 못했습니다.",
        },
        500: {
          description: "유저를 가져오지 못했습니다.",
        },
      },
    },
  },
  [routes.api + routes.users + routes.userId]: {
    // 특정 유저의 정보를 가져오는 API
    get: {
      tags: ["User"],
      summary: "특정 유저 정보 조회",
      description: "특정 유저의 정보를 id를 통해 조회합니다.",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "조회하고자 하는 유저의 ID",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "정상적으로 특정 유저 정보가 반환됨",
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "OAuth 로그인 시 자동으로 생성되는 id",
              },
              username: {
                type: "string",
                description: "각 OAuth 서비스에서 유저 본인이 지정한 이름",
              },
              profile: {
                type: "string",
                description:
                  "각 OAuth 서비스에서 유저 본인이 등록한 프로필 사진",
              },
              isAdmin: {
                type: "boolean",
                description: "사용자가 관리자인지 여부",
              },
            },
          },
        },
        404: {
          description: "유저 정보를 찾지 못했습니다.",
        },
        500: {
          description: "유저를 가져오지 못했습니다.",
        },
      },
    },
  },
};

swagger.addAPI(userRoutesAPI);
