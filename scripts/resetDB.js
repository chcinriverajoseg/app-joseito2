// backend/scripts/resetDB.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const resetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.dropDatabase();
    console.log("✅ Base de datos reseteada correctamente");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al resetear la base de datos:", err);
    process.exit(1);
  }
};

resetDB();
