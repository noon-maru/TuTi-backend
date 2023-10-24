import express from "express";
import routes from "./routes";

import { isAdmin } from "@middleware/isAdmin";
import {
  addCourseUserImage,
  createCourse,
  createRecommendedCourse,
  deleteCourse,
  deleteCourseUserImage,
  getCourse,
  getRecommendedCourse,
  updateCourse,
} from "@controllers/courseController";
import { upload } from "@middleware/courseUserImageMulter";

const router = express.Router();

// 입력받은 userid에 해당하는 유저가 만든 코스를 가져오는 라우터
router.get(routes.userId, getCourse);
// 관리자가 등록한 추천 코스를 가져오는 라우터
// userid를 붙인 이유는, 안붙이면 recommended를 userid로 이해해서 getCourse이 호출된다.
router.get(routes.recommended + routes.userId, getRecommendedCourse);

// 입력받은 userid에 해당하는 유저가 만든 코스를 추가하는 라우터
router.post(routes.userId, createCourse);
// 관리자가 만든 코스를 등록하는 라우터, 관리자 권한 필요
router.post(
  routes.recommended + routes.userId,
  isAdmin,
  createRecommendedCourse
);

// 이미 존재하는 코스를 수정하는 라우터
router.put(routes.userId + routes.courseId, updateCourse);

// 코스를 삭제하는 라우터
router.delete(routes.userId + routes.courseId, deleteCourse);

// 해당 코스의 특정 장소에 사용자 이미지 추가
router.post(
  routes.userimage + routes.userId + routes.courseId + routes.placeId,
  upload.single("image"),
  addCourseUserImage
);

// 해당 코스의 특정 장소의 사용자 이미지 삭제
router.delete(
  routes.userimage +
    routes.userId +
    routes.courseId +
    routes.placeId +
    routes.imageId,
  deleteCourseUserImage
);

export default router;
