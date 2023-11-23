import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const courseSchema = new Schema({
  courseName: { type: String, require: true }, // 이 코스의 이름
  user: { type: ObjectId, ref: "User", required: true }, // 이 코스를 만든 유저
  places: [{ type: ObjectId, ref: "Place", required: true }], // 이 코스에 해당하는 장소들
  travelTime: [{ type: Number, default: 0 }], // 각 장소 사이의 이동 시간
  totalFee: { type: Number, required: true }, // 각 장소들의 입장료 총합
  startDate: String, // 코스 진행 시작 날짜
  recordImages: [String], // 유저가 이 코스에 기록하는 이미지 주소
  mainRecordImageIndex: { type: Number, default: 0 }, // recordImages의 메인 이미지 인덱스 번호
  postContent: String, // 이 코스의 노트 내용
  isProgress: { type: Boolean, default: false }, // 이 코스가 현재 진행 중인 코스인지 여부
  isTermination: { type: Boolean, default: false }, // 이 코스가 종료된 코스인지 아닌지 여부
  isRecommended: { type: Boolean, default: false }, // 이 코스가 추천 코스인지 여부
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
