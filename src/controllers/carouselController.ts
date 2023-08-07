import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import processImages from "@models/grayscaleModel";

import { upload } from "@middleware/multer";

interface ImageData {
  imageName: string;
  grayscaleValue: number;
  imageUrl: string;
}

// 서버 시작 시 이미지의 그레이스케일 값을 계산하여 변수에 저장
const averageGrayscaleValuePromise = processImages();

// 이미지 처리 라우트

export const getCarousel = async (req: Request, res: Response) => {
  try {
    // 이미지와 함께 변수 값을 응답으로 전송
    const averageGrayscaleValues = await averageGrayscaleValuePromise;

    if (!averageGrayscaleValues) {
      console.error("그레이스케일 값이 없습니다.");
      return res.status(500).send("Internal Server Error");
    }

    // 이미지와 그레이스케일 값을 배열로 만들어서 저장할 변수
    const imageDataArray: ImageData[] = [];

    for (const { fileName, grayscaleValue } of averageGrayscaleValues) {
      const imageName: string = fileName.split(".")[0];

      // 이미지와 그레이스케일 값을 객체로 묶어서 배열에 추가
      imageDataArray.push({
        imageName,
        grayscaleValue: grayscaleValue,
        imageUrl: `/carousel/${fileName}`, // 이미지 파일의 URL을 저장
      });
    }

    // 클라이언트에게 이미지 데이터 배열을 전달
    res.status(200).json(imageDataArray);
  } catch (err) {
    console.error("에러 발생:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const postCarousel = (req: Request, res: Response) => {
  // multer 미들웨어 호출
  upload(req, res, (err) => {
    if (err) {
      console.error("파일 업로드 오류:", err);
      return res.status(500).json({ error: "파일 업로드 오류" });
    }

    // 파일 업로드 성공 후 처리 로직
    console.log("캐러셀 이미지 업로드 성공");

    const imageName = req.body.name;
    const tempFileName = path.join(
      __dirname,
      "../",
      "public",
      "carousel",
      "carousel_temp.png"
    );
    const finalFileName = path.join(
      __dirname,
      "../",
      "public",
      "carousel",
      `${imageName}.png`
    );

    // 파일 이름 변경
    fs.rename(tempFileName, finalFileName, (renameErr) => {
      if (renameErr) {
        console.error("파일 이름 변경 오류:", renameErr);
        return res.status(500).json({ error: "파일 이름 변경 오류" });
      }

      res.status(200).json({ message: "캐러셀 이미지 저장 성공" });
    });
  });
};
