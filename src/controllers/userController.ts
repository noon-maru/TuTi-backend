import { Request, Response } from "express";
import User from "@models/userModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "유저 정보들을 찾지 못했습니다." });
    }

    // 조회된 사용자 정보 응답
    res.status(200).json(users);
  } catch (error) {
    console.error("유저를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "유저를 가져오지 못했습니다." });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // User 모델을 사용하여 사용자명을 기반으로 사용자 정보 조회
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ error: "유저 정보를 찾지 못했습니다." });
    }

    // 조회된 사용자 정보 응답
    res.status(200).json(user);
  } catch (error) {
    console.error("유저를 가져오지 못했습니다:", error);
    res.status(500).json({ error: "유저를 가져오지 못했습니다." });
  }
};
