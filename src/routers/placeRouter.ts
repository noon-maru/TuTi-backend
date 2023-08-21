import express from "express";
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
// TODO: 장소 이름과 지역 이름을 통해 장소를 가져올 수 있도록 수정
router.get("/", getAllPlaces); // 모든 장소를 가져옴
router.get("/name/:placeName", getPlaceByName); // 특정 장소를 이름으로 가져옴
router.get("/region/:regionName", getPlacesByRegion); // 특정 지역의 모든 장소를 가져옴
router.get("/tag/:tag", getPlaceByTag); // 특정 태그를 가진 장소들을 가져옴
router.post("/", createPlace);
router.put("/:placeId", updatePlace);
router.delete("/:placeId", deletePlace);

export default router;
