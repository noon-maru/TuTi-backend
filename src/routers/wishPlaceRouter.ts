import express from "express";
import {
  getRandomWishPlaces,
  getWishPlaces,
  postWishPlace,
} from "@controllers/wishPlaceController";

// mergeParams을 써야, userRouter에서 입력 된 :userId를 가져올 수 있다.
const router = express.Router({ mergeParams: true });

// 찜 한 장소를 가져오는 라우터
router.get("/", getWishPlaces);

router.get("/random", getRandomWishPlaces);

// 찜 한 장소를 추가하는 라우터
router.post("/", postWishPlace);

export default router;
