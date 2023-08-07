import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";

import connectDB from "./db";

import routes from "@routers/routes";
import usersRouter from "@routers/userRouter";
import placeRouter from "@routers/placeRouter";
import recommendedPlaceRouter from "@routers/recommendedPlacesRouter";
import carouselRouter from "@routers/carouselRouter";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.set("port", process.env.PORT || 3000);

app.use(routes.api + routes.users, usersRouter);
app.use(routes.api + routes.place, placeRouter);
app.use(routes.api + routes.recommendedplaces, recommendedPlaceRouter);
app.use(routes.api + routes.carousel, carouselRouter);
app.use(
  "/carousel",
  express.static(path.join(__dirname, "public", "carousel"))
);

app.get("/", (req: Request, res: Response) => {
  res.send("TuTi 서버 동작중...");
});

app.listen(app.get("port"), () =>
  console.log(`서버 리스닝 포트: ${app.get("port")}`)
);
