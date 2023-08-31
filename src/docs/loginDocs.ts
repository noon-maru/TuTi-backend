import routes from "@routers/routes";
import SwaggerHandler from "@handler/swagger";

const swagger = SwaggerHandler.getInstance();

const loginAPI = {
  [routes.api + routes.auth + routes.login]: {
    post: {
      tags: ["Authentication"],
      summary: "사용자 로그인 혹은 회원가입",
      description:
        "제공된 ID를 통해 로그인을 시도합니다. 만약 회원 정보가 없다면 새로운 사용자 정보를 생성합니다.",
      parameters: [
        {
          name: "body",
          in: "body",
          required: true,
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "사용자의 ID",
              },
              username: {
                type: "string",
                description: "사용자의 이름",
              },
              profile: {
                type: "string",
                description: "사용자 프로필 정보",
              },
              isAdmin: {
                type: "boolean",
                description: "사용자가 관리자인지의 여부",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "로그인 성공 혹은 이미 회원가입 되어있는 회원",
        },
        201: {
          description: "회원가입 성공 및 로그인 성공",
        },
        500: {
          description: "서버 에러 혹은 회원가입 실패",
        },
      },
    },
  },
};

swagger.addAPI(loginAPI);
