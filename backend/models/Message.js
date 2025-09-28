import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const MessageSchema = new Schema(
  {
    chat: { type: Types.ObjectId, ref: "Chat", required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String, trim: true },
  },
  { timestamps: true }
);

MessageSchema.index({ chat: 1, createdAt: -1 });

export default mongoose.model("Message", MessageSchema);
