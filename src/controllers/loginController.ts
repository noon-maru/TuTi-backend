import { Request, Response } from "express";
import User from "@models/userModel";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user = await User.findOne({ id });

    console.log(req.body);

    if (!user) {
      // 사용자 정보 생성
      const newUser = new User({
        id: req.body.id,
        username: req.body.username,
        profile: req.body.profile,
        isAdmin: req.body.isAdmin,
      });

      // 사용자 정보 저장
      const savedUser = await newUser.save();

      // 클라이언트에 응답
      res.status(201).json(savedUser);
    } else {
      res.status(200).json({ message: "이미 회원가입 되어있는 회원입니다." });
    }
  } catch (error) {
    console.error("회원가입 실패:", error);
    res.status(500).json({ error: "회원가입 실패" });
  }
};
