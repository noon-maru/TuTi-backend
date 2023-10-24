import multer from "multer";
import path from "path";
import fs from "fs";

// 이미지를 저장할 경로와 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId, courseId, placeId } = req.params;
    const userFolder = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "userimage/",
      userId
    );
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    const courseFolder = path.join(userFolder + "/" + courseId);
    if (!fs.existsSync(courseFolder)) {
      fs.mkdirSync(courseFolder);
    }

    const placeFolder = path.join(courseFolder + "/" + placeId);
    if (!fs.existsSync(placeFolder)) {
      fs.mkdirSync(placeFolder);
    }

    cb(null, placeFolder);
  },
  filename: (req, file, cb) => {
    // 파일명을 현재 날짜와 랜덤 문자열을 포함하여 고유하게 설정
    const uniqueFileName =
      Date.now() +
      "-" +
      Math.random().toString(36).substring(7) +
      "." +
      file.originalname.split(".").pop();
    cb(null, uniqueFileName);
  },
});

// multer 미들웨어 생성
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // 파일 유형 검증 (이미지 파일만 허용)
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    } else {
      return cb(new Error("이미지 파일만 허용됩니다."));
    }
  },
});
