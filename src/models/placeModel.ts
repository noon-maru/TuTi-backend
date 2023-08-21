import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  region: { type: String, required: true }, // 장소 지역
  name: { type: String, required: true }, // 장소 이름
  address: { type: String, required: true }, // 장소 주소
  image: { type: String, required: true }, // 장소 사진 url
  numberHearts: { type: Number, default: 0, required: true }, // 해당 장소가 받은 하트 개수
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
