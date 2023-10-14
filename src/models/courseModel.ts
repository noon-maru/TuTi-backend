import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const courseSchema = new Schema({
  courseName: { type: String, require: true },
  user: { type: ObjectId, ref: "User", required: true }, // 이 코스를 만든 유저
  places: [{ type: ObjectId, ref: "Place", required: true }], // 이 코스에 해당하는 장소들
  travelTime: [{ type: Number, default: 0 }], // 각 장소 사이의 이동 시간
  totalFee: { type: Number, required: true }, // 각 장소들의 입장료 총합
  isRecommended: { type: Boolean, default: false }, // 이 코스가 추천 코스인지 여부
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
