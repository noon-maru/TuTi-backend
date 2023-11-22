import express from "express";
import path from "path";
import routes from "./routes";

import {
  deleteCarousel,
  getCarousel,
  postCarousel,
} from "@controllers/carouselController";

import { isAdmin } from "@middleware/isAdmin";

const router = express.Router();

router.get("/", getCarousel);

router.use(
  "/",
  express.static(path.join(__dirname, "../", "../", "public", "carousel"))
);

router.post(routes.userId, isAdmin, postCarousel);

router.delete(routes.userId + "/:imageName", isAdmin, deleteCarousel);

export default router;
