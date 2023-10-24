import express from "express";
import routes from "./routes";

import {
  createPlace,
  deletePlace,
  getAllPlaces,
  getPlaceByName,
  getPlacesByRegion,
  getPlaceByTag,
  updatePlace,
} from "@controllers/placeController";

const router = express.Router();

// TODO: get을 제외한 나머지 라우터는 관리자만 접근 할 수 있도록 수정
router.get("/", getAllPlaces); // 모든 장소를 가져옴
router.get(routes.name + "/:placeName", getPlaceByName); // 특정 장소를 이름으로 가져옴
router.get(routes.region + "/:regionName", getPlacesByRegion); // 특정 지역의 모든 장소를 가져옴
router.get(routes.tag + "/:tag", getPlaceByTag); // 특정 태그를 가진 장소들을 가져옴
router.post("/", createPlace);
router.put(routes.placeId, updatePlace);
router.delete(routes.placeId, deletePlace);

export default router;
