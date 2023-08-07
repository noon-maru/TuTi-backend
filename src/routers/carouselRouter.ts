import express from "express";
import routes from "./routes";

import { getCarousel, postCarousel } from "@controllers/carouselController";

import { isAdmin } from "@middleware/isAdmin";

const router = express.Router();

router.get("/", getCarousel);

router.post(routes.userid, isAdmin, postCarousel);

export default router;
