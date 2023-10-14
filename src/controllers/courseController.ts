import { Request, Response } from "express";
import mongoose from "mongoose";
import Course from "@models/courseModel";
import User from "@models/userModel";
import Place from "@models/placeModel";

export const getCourse = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).json({ message: "잘못된 요청입니다." });

    const courses = await Course.find({ user: user._id });

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
    const courses = await Course.find({ isRecommended: true });

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
      places: { $all: places.map((place) => place._id) },
    });

    if (existingCourse) {
      return res.json({ message: "이미 등록 된 코스입니다." });
    }

    // 코스 생성 및 응답
    const course = new Course({
      courseName,
      user: user._id,
      places: places.map((place) => place._id),
      travelTime,
      totalFee,
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

export const updateCourse = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;
  const { courseName, placesId, travelTime, totalFee, isProgress } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    if (course.user.toString() !== userId) {
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
        isProgress,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ error: "해당하는 코스를 찾지 못했습니다." });
    }

    res.json({
      message: "코스가 성공적으로 업데이트되었습니다.",
      course: updatedCourse,
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
      places: { $all: places.map((place) => place._id) },
    });

    if (existingCourse) {
      return res.json({ message: "이미 등록 된 코스입니다." });
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
