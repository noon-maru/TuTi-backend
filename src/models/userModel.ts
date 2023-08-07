import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true }, // OAuth 로그인 시 자동으로 생성되는 id
  username: { type: String, required: true }, // 각 OAuth 서비스에서 유저 본인이 지정한 이름
  profile: { type: String }, // 각 OAuth 서비스에서 유저 본인이 등록한 프로필 사진
  isAdmin: { type: Boolean, default: false }, // 사용자가 관리자인지 여부
});

const User = mongoose.model("user", userSchema);

export default User;
