import { Request, Response } from "express";

import Place from "@models/placeModel";
import Tag from "@models/tagModel";

export const createPlace = async (req: Request, res: Response) => {
  const { region, name, address, image, numberHearts, tag } = req.body;

  const newTagIds = await createTag(tag);

  try {
    // 이미 존재하는 장소인지 확인
    const existingPlace = await Place.findOne({ name, address });

    if (existingPlace) {
      // 이미 존재하는 장소이면 해당 장소의 정보를 반환하고 함수 종료
      return res.status(400).json({ message: "이미 존재하는 장소입니다." });
    }

    const newPlace = new Place({
      region,
      name,
      address,
      image,
      numberHearts,
      tags: newTagIds,
    });

    const savedPlace = await newPlace.save();

    res.json(savedPlace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const createTag = async (tagNames: string[]) => {
  try {
    const newTagIds = await Promise.all(
      tagNames.map(async (tagName) => {
        // 이미 존재하는 태그인지 확인
        const existingTag = await Tag.findOne({ tagName });

        if (existingTag) {
          // 이미 존재하는 태그면 그 태그의 _id를 반환
          return existingTag._id;
        } else {
          // 존재하지 않는 태그면 새로운 태그를 생성하고 저장
          const newTag = new Tag({
            tagName,
          });

          const savedTag = await newTag.save();
          return savedTag._id;
        }
      })
    );

    return newTagIds;
  } catch (err) {
    console.error(err);
  }
};

export const getAllPlaces = async (req: Request, res: Response) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getPlaceByName = async (req: Request, res: Response) => {
  const { placeName } = req.params;

  try {
    const place = await Place.findOne({ name: placeName });

    if (!place) {
      return res
        .status(404)
        .json({ message: "해당 이름의 장소를 찾을 수 없습니다." });
    }

    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getPlacesByRegion = async (req: Request, res: Response) => {
  const { regionName } = req.params;

  try {
    const places = await Place.find({ region: regionName });

    if (places.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 지역의 장소를 찾을 수 없습니다." });
    }

    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getPlaceByTag = async (req: Request, res: Response) => {
  const { tag } = req.params;
  try {
    const places = await Place.find({ tag: tag });
    if (places.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 태그를 가진 장소를 찾을 수 없습니다." });
    }

    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const updatePlace = async (req: Request, res: Response) => {
  const { placeId } = req.params;
  const { region, name, address, image, numberHearts } = req.body;

  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      placeId,
      { region, name, address, image, numberHearts },
      { new: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "장소를 찾을 수 없습니다." });
    }

    res.json(updatedPlace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const deletePlace = async (req: Request, res: Response) => {
  const { placeId } = req.params;

  try {
    const deletedPlace = await Place.findByIdAndDelete(placeId);

    if (!deletedPlace) {
      return res.status(404).json({ message: "장소를 찾을 수 없습니다." });
    }

    res.json({ message: "장소가 성공적으로 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};
