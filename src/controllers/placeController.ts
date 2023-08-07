import { Request, Response } from "express";

import Place from "@models/placeModel";

export const createPlace = async (req: Request, res: Response) => {
  const { region, name, address, image } = req.body;

  try {
    const newPlace = new Place({
      region,
      name,
      address,
      image,
    });

    const savedPlace = await newPlace.save();

    res.json(savedPlace);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getPlaces = async (req: Request, res: Response) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const updatePlace = async (req: Request, res: Response) => {
  const { placeId } = req.params;
  const { region, name, address, image } = req.body;

  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      placeId,
      { region, name, address, image },
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
