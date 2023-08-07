import { Request, Response, NextFunction } from "express";
import User from "@models/userModel";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  const user = await User.findOne({ id: userId, isAdmin: true });

  if (!user) {
    return res.status(403).json({ message: "권한이 없습니다." });
  }

  // 관리자일 경우, 다음 미들웨어 또는 라우터 핸들러로 이동
  next();
};
