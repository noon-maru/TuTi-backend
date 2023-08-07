import { Request, Response } from "express";

import Place from "@models/placeModel";
import RecommendedPlace from "@models/recommendedPlaceModel";

// 모든 추천 장소를 가져오는 컨트롤러
export const getRecommendedPlaces = async (req: Request, res: Response) => {
  try {
    const recommendedPlaces = await RecommendedPlace.find().populate("place");

    res.status(200).json(recommendedPlaces);
  } catch (error) {
    console.error("추천 장소를 가져오는데 실패했습니다:", error);
    res.status(500).json({ error: "추천 장소를 가져오는데 실패했습니다." });
  }
};

// 추천 장소를 추가하는 컨트롤러
export const postRecommendedPlace = async (req: Request, res: Response) => {
  const { placeId } = req.body;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ error: "장소를 찾을 수 없습니다." });
    }

    const recommendedPlace = new RecommendedPlace({ place: place._id });

    await recommendedPlace.save();

    return res.json({ message: "추천 장소가 성공적으로 추가되었습니다." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
};

// 추천 장소를 제거하는 컨트롤러
export const deleteRecommendedPlace = async (req: Request, res: Response) => {
  const { recommendedPlaceId } = req.params;

  try {
    const recommendedPlace = await RecommendedPlace.findByIdAndRemove(
      recommendedPlaceId
    );

    if (!recommendedPlace) {
      return res.status(404).json({ error: "추천 장소를 찾을 수 없습니다." });
    }

    return res.json({ message: "추천 장소가 성공적으로 제거되었습니다." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
};
