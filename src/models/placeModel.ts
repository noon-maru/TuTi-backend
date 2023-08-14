import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  region: { type: String, required: true }, // 장소 지역
  name: { type: String, required: true }, // 장소 이름
  address: { type: String, required: true }, // 장소 주소
  image: { type: String, require: true }, // 장소 사진 url
  numberHearts: { type: Number, require: true }, // 해당 장소가 받은 하트 개수
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
