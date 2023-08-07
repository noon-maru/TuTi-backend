import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaces,
  updatePlace,
} from "@controllers/placeController";

const router = express.Router();

// TODO: get을 제외한 나머지 라우터는 관리자만 접근 할 수 있도록 수정
router.post("/", createPlace);
router.get("/", getPlaces);
router.put("/:placeId", updatePlace);
router.delete("/:placeId", deletePlace);

export default router;
