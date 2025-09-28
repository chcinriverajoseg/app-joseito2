/*// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hash
    avatar: { type: String },
    interests: [{ type: String }],
  },
  { timestamps: true }
);

// Hash antes de guardar si cambió el password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar password plano vs hash
UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Para no exponer el hash
UserSchema.methods.toJSONSafe = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
*/
// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, Types } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // se guarda en hash
    },
    avatar: {
      type: String,
      default: null,
    },
    interests: [
      {
        type: String,
      },
    ],

    // --- Campos para Explore / Matches ---
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ], // usuarios a los que este usuario dio like

    skips: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ], // usuarios que omitió

    matches: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ], // matches confirmados
  },
  { timestamps: true }
);

// 📌 Índices útiles
//UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ likes: 1 });
UserSchema.index({ matches: 1 });

// 📌 Hash automático antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 📌 Método para comparar password plano con hash
UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// 📌 Quitar password al devolver JSON
UserSchema.methods.toJSONSafe = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
