import mongoose from "mongoose";

const { Schema } = mongoose;

const recommendedPlaceSchema = new Schema({
  place: { type: mongoose.Types.ObjectId, ref: "Place", required: true }, // 장소의 ObjectId
});

const RecommendedPlace = mongoose.model(
  "RecommendedPlace",
  recommendedPlaceSchema
);

export default RecommendedPlace;
