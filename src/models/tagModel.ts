import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema({
  tagName: { type: String, required: true },
  associatedCount: { type: Number, default: 0 }, // 해당 태그와 연결된 항목 수
  relatedTags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // 관련 태그
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
