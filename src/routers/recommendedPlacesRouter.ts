import express from "express";
import routes from "./routes";

import {
  getRecommendedPlaces,
  postRecommendedPlace,
  deleteRecommendedPlace,
} from "@controllers/recommendedPlaceController";

import { isAdmin } from "@middleware/isAdmin";

const router = express.Router();

// 모든 사용자는 추천 장소 목록을 볼 수 있습니다.
router.get("/", getRecommendedPlaces);

// 관리자만 추천 장소를 추가할 수 있습니다.
router.post(routes.userId, isAdmin, postRecommendedPlace);

// 관리자만 추천 장소를 삭제할 수 있습니다.
router.delete(
  routes.userId + "/:recommendedPlaceId",
  isAdmin,
  deleteRecommendedPlace
);

export default router;
