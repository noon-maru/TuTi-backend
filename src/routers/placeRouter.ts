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

import { isAdmin } from "@middleware/isAdmin";

const router = express.Router();

router.get("/", getAllPlaces); // 모든 장소를 가져옴
router.get(routes.name + "/:placeName", getPlaceByName); // 특정 장소를 이름으로 가져옴
router.get(routes.region + "/:regionName", getPlacesByRegion); // 특정 지역의 모든 장소를 가져옴
router.get(routes.tag + "/:tag", getPlaceByTag); // 특정 태그를 가진 장소들을 가져옴
router.post(routes.userId, isAdmin, createPlace);
router.put(routes.userId + routes.placeId, isAdmin, updatePlace);
router.delete(routes.userId + routes.placeId, isAdmin, deletePlace);

export default router;
