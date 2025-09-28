import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const ChatSchema = new Schema(
  {
    members: [{ type: Types.ObjectId, ref: "User", required: true }], // 2 miembros
    lastMessage: { type: Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

// Genera un campo virtual "peer" para el miembro distinto al usuario actual (se pobla por controlador)
ChatSchema.index({ members: 1 }); // índice para búsquedas por miembro

export default mongoose.model("Chat", ChatSchema);
