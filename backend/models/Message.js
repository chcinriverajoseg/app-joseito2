import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  type: { type: String, default: "text" }, // text | image
  url: String,
  read: { type: Boolean, default: false },
  createdAt: Date,
});

export default mongoose.model("Message", MessageSchema);
