import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const placeSchema = new Schema({
  region: { type: String, required: true }, // 장소 지역
  name: { type: String, required: true }, // 장소 이름
  address: { type: String, required: true }, // 장소 주소
  latitude: { type: Number, require: true }, // 장소 위도
  longitude: { type: Number, require: true }, // 장소 경도
  image: { type: String, required: true }, // 장소 사진 url
  wishPlaceCount: { type: Number, default: 0 }, // 해당 장소에 하트를 누른 사람들의 수
  isLandmark: { type: Boolean, default: false }, // 해당 장소가 랜드마크인지 여부
  tags: [{ type: ObjectId, ref: "Tag" }],
  tourismInfo: {
    parkingInfo: { type: String },
    advice: { type: String },
    admissionFee: { type: String, default: 0 }, // 입장료
    closedDays: [{ type: String }], // 휴무일 (여러 날짜가 될 수 있으므로 배열 사용)
    subwayInfo: [{ type: String }], // 지하철 정보
    busInfo: {
      busRoutes: [{ type: String }], // 버스 노선 (여러 노선이 될 수 있으므로 배열 사용)
      busStops: [{ type: String }], // 버스 정류장 (여러 정류장이 될 수 있으므로 배열 사용)
    },
  },
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
