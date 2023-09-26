import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "@models/userModel";
import Place from "@models/placeModel";
import WishPlace from "@models/wishPlaceModel";

// 유저가 찜한 전체 장소를 가져오는 컨트롤러
export const getWishPlaces = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).json({ message: "잘못된 요청입니다." });

    const wishPlaces = await WishPlace.find({ user: user._id });

    if (!wishPlaces) {
      return res.status(404).json({ error: "찜 한 장소를 찾지 못했습니다." });
    }

    const places: mongoose.Types.ObjectId[] = [];
    for (const value of wishPlaces) {
      const place: mongoose.Types.ObjectId | null = await Place.findById(
        value.place
      );
      if (place !== null) places.push(place);
    }

    res.status(200).json(places);
  } catch (error) {
    console.error("찜 한 장소를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "찜 한 장소를 가져오지 못했습니다." });
  }
};

// 유저가 찜 한 장소 중 랜덤한 3개만 반환하는 컨트롤러
export const getRandomWishPlaces = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findOne({ id: userId });

  if (!user) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  try {
    const wishPlaces = await WishPlace.find({ user: user._id });

    if (!wishPlaces) {
      return res.status(404).json({ error: "찜 한 장소를 찾지 못했습니다." });
    }

    const places: mongoose.Types.ObjectId[] = [];
    for (const value of wishPlaces) {
      const place: mongoose.Types.ObjectId | null = await Place.findById(
        value.place
      );
      if (place !== null) places.push(place);
    }

    // 찜한 장소가 4개 미만일 때
    if (places.length < 4) {
      return res.status(200).json(places);
    }

    // 찜한 장소가 4개 이상일 때
    const randomIndices: number[] = [];
    while (randomIndices.length < 3) {
      let randomIndex = Math.floor(Math.random() * places.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const selectedPlaces = randomIndices.map((index) => places[index]);

    return res.status(200).json(selectedPlaces);
  } catch (error) {
    console.error("찜 한 장소를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "찜 한 장소를 가져오지 못했습니다." });
  }
};

// 유저가 찜 한 장소를 추가하는 컨트롤러
export const postWishPlace = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { placeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  try {
    const user = await User.findOne({ id: userId });
    const place = await Place.findById(placeId);

    if (!user || !place) {
      return res
        .status(404)
        .json({ message: "사용자 또는 장소를 찾을 수 없습니다." });
    }

    // 이미 찜한 장소인지 확인
    const existingWishPlace = await WishPlace.findOne({
      user: user._id,
      place: place._id,
    });

    // 이미 찜한 장소라면 메시지를 반환
    if (existingWishPlace) {
      return res.json({ message: "이미 찜한 장소입니다." });
    }

    const wishPlace = new WishPlace({
      user: user._id,
      place: place._id,
    });

    const savedWishPlace = await wishPlace.save();

    return res.json({
      message: "찜한 장소가 성공적으로 추가되었습니다.",
      wishPlace: savedWishPlace,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
};

// 유저가 찜한 장소를 삭제하는 컨트롤러
export const deleteWishPlace = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { placeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  try {
    const user = await User.findOne({ id: userId });
    const place = await Place.findById(placeId);

    if (!user || !place) {
      return res
        .status(404)
        .json({ message: "사용자 또는 장소를 찾을 수 없습니다." });
    }

    // 찜한 장소를 찾아서 삭제
    const deletedWishPlace = await WishPlace.findOneAndDelete({
      user: user._id,
      place: place._id,
    });

    if (!deletedWishPlace) {
      return res.json({ message: "찜한 장소를 찾을 수 없습니다." });
    }

    return res.json({
      message: "찜한 장소가 성공적으로 삭제되었습니다.",
      deletedWishPlace,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
};
