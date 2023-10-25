import { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import sharp from "sharp";

import Course from "@models/courseModel";
import User from "@models/userModel";
import Place from "@models/placeModel";

export const getCourse = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).json({ message: "잘못된 요청입니다." });

    const courses = await Course.find({ user: user._id }).populate("places");

    if (!courses) {
      return res
        .status(404)
        .json({ error: "해당 되는 코스 정보를 찾지 못했습니다." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("코스를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "코스를 가져오지 못했습니다." });
  }
};

export const getRecommendedCourse = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ isRecommended: true }).populate(
      "places"
    );

    if (!courses) {
      return res
        .status(404)
        .json({ error: "해당 되는 코스 정보를 찾지 못했습니다." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("코스를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "코스를 가져오지 못했습니다." });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { courseName, placesId, travelTime, totalFee, recordImages } = req.body;

  try {
    // 각 장소 ID들이 유효한 값인지 확인
    const invalidPlaceIds = placesId.filter(
      (placeId: mongoose.Types.ObjectId) =>
        !mongoose.Types.ObjectId.isValid(placeId)
    );

    if (invalidPlaceIds.length > 0) {
      return res.status(400).json({
        message: `${invalidPlaceIds.join(", ")}는 유효하지 않은 장소ID입니다.`,
      });
    }

    // 사용자와 장소 정보 조회
    const user = await User.findOne({ id: userId });
    const placePromises = placesId.map(
      async (placeId: mongoose.Types.ObjectId) => {
        const place = await Place.findById(placeId);
        return place;
      }
    );

    // 비동기 작업 완료를 기다림
    const places = await Promise.all(placePromises);

    if (!user) {
      return res
        .status(404)
        .json({ message: "해당하는 유저를 찾을 수 없습니다." });
    }

    // 이미 등록한 코스인지 확인
    const existingCourse = await Course.findOne({
      user: user._id,
      places: { $eq: places.map((place) => place._id) },
    });

    console.log(existingCourse);

    if (existingCourse) {
      return res.status(409).json({ message: "이미 등록 된 코스입니다." });
    }

    // 코스 생성 및 응답
    const course = new Course({
      courseName,
      user: user._id,
      places: places.map((place) => place._id),
      travelTime,
      totalFee,
      recordImages,
    });

    const savedCourse = await course.save();

    res.json({
      message: "코스가 성공적으로 추가되었습니다.",
      course: savedCourse,
    });
  } catch (error) {
    console.error("코스를 생성하지 못했습니다:", error);
    res.status(500).json({ error: "코스를 생성하지 못했습니다." });
  }
};

export const addCourseUserImage = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(500).json({ message: "파일 업로드에 실패했습니다." });
  }
  const fileName = req.file!.filename.replace(/\.\w+$/, ".webp"); // 파일명
  const imagePath = req.file!.path; // 파일 경로
  const outputPath = imagePath.replace(/\.\w+$/, ".webp"); // 저장될 파일의 확장자를 WebP로 변경

  const { userId, courseId, placeId } = req.params;

  try {
    const image = sharp(imagePath);

    const { width } = await image.metadata(); // 원본이미지 크기
    image
      .webp()
      .withMetadata()
      .resize(width! > 1080 ? 1080 : width) // 원본 비율 유지하면서 width 크기만 설정
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error("이미지 변환에 실패했습니다.", err);
          return res.status(500).json({ error: "이미지 변환에 실패했습니다." });
        }

        // 원본 이미지 삭제
        fs.unlinkSync(imagePath);
      });

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    const userObject = await User.findById(course.user);

    if (!userObject) {
      return res
        .status(404)
        .json({ error: "해당하는 유저를 찾지 못했습니다." });
    }

    if (userObject.id !== userId) {
      return res
        .status(403)
        .json({ error: "코스를 업데이트할 권한이 없습니다." });
    }

    const place = course.places.find(
      (placeObjectId: mongoose.Types.ObjectId) =>
        placeObjectId.toString() === placeId
    );

    if (!place) {
      return res
        .status(404)
        .json({ error: "이 코스에서 해당 장소를 찾지 못했습니다." });
    }

    const recordImage = `/static/userimage/${userId}/${courseId}/${placeId}/${fileName}`;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId, // 첫 번째 인수: 업데이트할 문서의 ID
      {
        $push: {
          recordImages: recordImage,
        },
      }, // 두 번째 인수: 업데이트할 내용
      { new: true } // { new: true }를 설정하여 업데이트 후의 문서를 반환
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    res.json({
      message: "코스에 이미지를 성공적으로 업데이트하였습니다.",
      recordImage,
    });
  } catch (error) {
    console.error("코스에 이미지를 업데이트하지 못했습니다:", error);
    res.status(500).json({ error: "코스에 이미지를 업데이트하지 못했습니다." });
  }
};

export const updateCourseUserImage = async (req: Request, res: Response) => {
  const { userId, courseId, placeId, imageId } = req.params; // imageId는 삭제할 이미지의 파일명

  if (!req.file) {
    res.status(500).json({ message: "파일 업로드에 실패했습니다." });
  }
  const fileName = req.file!.filename.replace(/\.\w+$/, ".webp"); // 새로 업로드 한 파일명
  const imagePath = req.file!.path; // 파일 경로
  const outputPath = imagePath.replace(/\.\w+$/, ".webp"); // 저장될 파일의 확장자를 WebP로 변경

  try {
    const image = sharp(imagePath);

    const { width } = await image.metadata(); // 원본이미지 크기
    image
      .webp()
      .withMetadata()
      .resize(width! > 1080 ? 1080 : width) // 원본 비율 유지하면서 width 크기만 설정
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error("이미지 변환에 실패했습니다.", err);
          return res.status(500).json({ error: "이미지 변환에 실패했습니다." });
        }

        // 원본 이미지 삭제
        fs.unlinkSync(imagePath);
      });

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    const userObject = await User.findById(course.user);

    if (!userObject) {
      return res
        .status(404)
        .json({ error: "해당하는 유저를 찾지 못했습니다." });
    }

    if (userObject.id !== userId) {
      return res
        .status(403)
        .json({ error: "코스를 업데이트할 권한이 없습니다." });
    }

    const place = course.places.find(
      (placeObjectId: mongoose.Types.ObjectId) =>
        placeObjectId.toString() === placeId
    );

    if (!place) {
      return res
        .status(404)
        .json({ error: "이 코스에서 해당 장소를 찾지 못했습니다." });
    }

    // 저장된 이미지 경로
    const recordImagePath = `/static/userimage/${userId}/${courseId}/${placeId}/${fileName}`;

    // 삭제할 이미지 경로
    const imagePathToDelete = `/userimage/${userId}/${courseId}/${placeId}/${imageId}`;

    // 배열 내에서 이미지를 직접 찾아 업데이트
    const recordImages = course.recordImages.map((image) => {
      if (image === "/static" + imagePathToDelete) {
        return recordImagePath; // 이미지 경로가 일치하는 경우 새 이미지로 교체
      }
      return image;
    });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId, // 첫 번째 인수: 업데이트할 문서의 ID
      {
        $set: {
          recordImages: recordImages,
        },
      }, // 두 번째 인수: 업데이트할 내용
      { new: true } // { new: true }를 설정하여 업데이트 후의 문서를 반환
    );

    // 스토리지에서 기존 이미지 파일 삭제
    fs.unlinkSync(path.join(__dirname + "../../../.." + imagePathToDelete));

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    res.json({
      message: "코스에 이미지를 성공적으로 업데이트하였습니다.",
      recordImagePath,
    });
  } catch (error) {
    console.error("코스에 이미지를 업데이트하지 못했습니다:", error);
    res.status(500).json({ error: "코스에 이미지를 업데이트하지 못했습니다." });
  }
};

export const deleteCourseUserImage = async (req: Request, res: Response) => {
  const { userId, courseId, placeId, imageId } = req.params; // imageId는 삭제할 이미지의 파일명

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    const userObject = await User.findById(course.user);

    if (!userObject) {
      return res
        .status(404)
        .json({ error: "해당하는 유저를 찾지 못했습니다." });
    }

    if (userObject.id !== userId) {
      return res
        .status(403)
        .json({ error: "코스를 업데이트할 권한이 없습니다." });
    }

    const place = course.places.find(
      (placeObjectId: mongoose.Types.ObjectId) =>
        placeObjectId.toString() === placeId
    );

    if (!place) {
      return res
        .status(404)
        .json({ error: "이 코스에서 해당 장소를 찾지 못했습니다." });
    }

    // 이미지 경로를 찾아서 삭제
    const imagePath = `/userimage/${userId}/${courseId}/${placeId}/${imageId}`;

    // 이미지 파일 삭제
    fs.unlinkSync(path.join(__dirname + "../../../.." + imagePath));

    // Course 객체에서 이미지 경로 제거
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { recordImages: "/static" + imagePath },
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    res.json({
      message: "이미지가 성공적으로 삭제되었고, 코스가 업데이트되었습니다.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("이미지를 삭제하거나 코스를 업데이트하지 못했습니다:", error);
    res
      .status(500)
      .json({ error: "이미지를 삭제하거나 코스를 업데이트하지 못했습니다." });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;
  const {
    courseName,
    placesId,
    travelTime,
    totalFee,
    recordImages,
    isProgress,
    isTermination,
  } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    const userObject = await User.findById(course.user);

    if (!userObject) {
      return res
        .status(404)
        .json({ error: "해당하는 유저를 찾지 못했습니다." });
    }

    if (userObject.id !== userId) {
      return res
        .status(403)
        .json({ error: "코스를 업데이트할 권한이 없습니다." });
    }

    // 각 장소 ID들이 유효한 값인지 확인
    const invalidPlaceIds = placesId.filter(
      (placeId: mongoose.Types.ObjectId) =>
        !mongoose.Types.ObjectId.isValid(placeId)
    );

    if (invalidPlaceIds.length > 0) {
      return res.status(400).json({
        message: `${invalidPlaceIds.join(", ")}는 유효하지 않은 장소ID입니다.`,
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseName,
        places: placesId,
        travelTime,
        totalFee,
        recordImages,
        isProgress,
        isTermination,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    // 업데이트된 문서를 다시 찾아와서 populate 메서드를 적용
    const populatedCourse = await Course.findById(courseId).populate("places");

    res.json({
      message: "코스가 성공적으로 업데이트되었습니다.",
      course: populatedCourse,
    });
  } catch (error) {
    console.error("코스를 업데이트하지 못했습니다:", error);
    res.status(500).json({ error: "코스를 업데이트하지 못했습니다." });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(400).json({ message: "잘못된 요청입니다." });
    }

    const course = await Course.findOne({ _id: courseId, user: user._id });
    if (!course) {
      return res.status(404).json({ message: "해당 코스를 찾지 못했습니다." });
    }

    // 코스를 삭제
    await Course.deleteOne({ _id: courseId });

    res.json({ message: "코스가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("코스를 삭제하지 못했습니다:", error);
    res.status(500).json({ error: "코스를 삭제하지 못했습니다." });
  }
};

export const createRecommendedCourse = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { courseName, placesId, travelTime, totalFee } = req.body;

  try {
    // 각 장소 ID들이 유효한 값인지 확인
    const invalidPlaceIds = placesId.filter(
      (placeId: mongoose.Types.ObjectId) =>
        !mongoose.Types.ObjectId.isValid(placeId)
    );

    if (invalidPlaceIds.length > 0) {
      return res.status(400).json({
        message: `${invalidPlaceIds.join(", ")}는 유효하지 않은 장소ID입니다.`,
      });
    }

    // 사용자와 장소 정보 조회
    const user = await User.findOne({ id: userId });
    const placePromises = placesId.map(
      async (placeId: mongoose.Types.ObjectId) => {
        const place = await Place.findById(placeId);
        return place;
      }
    );

    // 비동기 작업 완료를 기다림
    const places = await Promise.all(placePromises);

    if (!user) {
      return res
        .status(404)
        .json({ message: "해당하는 유저를 찾을 수 없습니다." });
    }

    // 이미 등록한 코스인지 확인
    const existingCourse = await Course.findOne({
      user: user._id,
      places: { $eq: places.map((place) => place._id) },
    });

    if (existingCourse) {
      return res.status(409).json({ message: "이미 등록 된 코스입니다." });
    }

    // 코스 생성 및 응답
    const course = new Course({
      courseName,
      user: user._id,
      places: places.map((place) => place._id),
      travelTime,
      totalFee,
      isRecommended: true,
    });

    const savedCourse = await course.save();

    res.json({
      message: "코스가 성공적으로 추가되었습니다.",
      course: savedCourse,
    });
  } catch (error) {
    console.error("코스를 생성하지 못했습니다:", error);
    res.status(500).json({ error: "코스를 생성하지 못했습니다." });
  }
};
