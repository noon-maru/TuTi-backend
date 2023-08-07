import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const wishPlaceSchema = new Schema({
  place: { type: ObjectId, ref: "Place", required: true }, // 찜한 장소
  user: { type: ObjectId, ref: "User", required: true }, // 이 장소를 찜한 유저들
});

const WishPlace = mongoose.model("WishPlace", wishPlaceSchema);

export default WishPlace;
