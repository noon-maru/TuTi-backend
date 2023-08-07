import express from "express";
import routes from "./routes";

import { getUser, getUsers } from "@controllers/userController";

import loginRouter from "./loginRouter";
import wishPlaceRouter from "./wishPlaceRouter";

const router = express.Router();

// 전체 유저의 정보를 가져오는 라우터
router.get("/", getUsers);

// 특정 유저의 정보를 가져오는 라우터
router.get(routes.userid, getUser);

// 로그인 라우터
router.use(routes.login, loginRouter);

// 찜 한 장소 관련 라우터
router.use(routes.userid + routes.wishplace, wishPlaceRouter);

export default router;
