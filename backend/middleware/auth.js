// backend/middleware/auth.js
// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("_id name email avatar");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (e) {
    console.error("[AUTH]", e?.message || e);
    res.status(401).json({ message: "Unauthorized" });
  }
}
