import express from "express";
import routes from "./routes";

import { isAdmin } from "@middleware/isAdmin";
import {
  createCourse,
  createRecommendedCourse,
  getCourse,
  getRecommendedCourse,
} from "@controllers/courseController";

const router = express.Router();

// 입력받은 userid에 해당하는 유저가 만든 코스를 가져오는 라우터
router.get(routes.userid, getCourse);
// 관리자가 등록한 추천 코스를 가져오는 라우터
// userid를 붙인 이유는, 안붙이면 recommended를 userid로 이해해서 getCourse이 호출된다.
router.get(routes.recommended + routes.userid, getRecommendedCourse);

// 입력받은 userid에 해당하는 유저가 만든 코스를 추가하는 라우터
router.post(routes.userid, createCourse);
// 관리자가 만든 코스를 등록하는 라우터, 관리자 권한 필요
router.post(
  routes.recommended + routes.userid,
  isAdmin,
  createRecommendedCourse
);

export default router;
