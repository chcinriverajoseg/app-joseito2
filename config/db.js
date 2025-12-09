// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("📦 MONGO_URI recibido:", process.env.MONGO_URI); // Debug

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
