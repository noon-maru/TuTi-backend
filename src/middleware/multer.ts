import multer from "multer";
import path from "path";

// 이미지를 저장할 경로와 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "public", "carousel"));
  },
  filename: (req, file, cb) => {
    cb(null, `carousel_temp.png`); // 임시로 파일명 생성
  },
});

// multer 미들웨어 생성
export const upload = multer({ storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "no", maxCount: 1 },
]);
