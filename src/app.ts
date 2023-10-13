import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db";

import { setupRouter } from "@routers/index";

import routes from "@routers/routes";
import usersRouter from "@routers/userRouter";
import placeRouter from "@routers/placeRouter";
import recommendedPlaceRouter from "@routers/recommendedPlacesRouter";
import courseRouter from "@routers/courseRouter";
import carouselRouter from "@routers/carouselRouter";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB();

setupRouter(app);

app.set("port", process.env.PORT || 3000);

app.use(routes.api + routes.users, usersRouter);
app.use(routes.api + routes.place, placeRouter);
app.use(routes.api + routes.recommendedplaces, recommendedPlaceRouter);
app.use(routes.api + routes.course, courseRouter);
app.use(routes.api + routes.carousel, carouselRouter);

// React 앱의 정적 파일 제공
app.use(
  express.static(path.join(__dirname, "../", "../", "tuti-react/", "build"))
);

// api 요청 이외의 모든 요청을 React 앱으로 라우팅
app.use("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../", "../", "tuti-react/", "build", "index.html")
  );
});

app.listen(app.get("port"), () =>
  console.log(`서버 리스닝 포트: ${app.get("port")}`)
);
