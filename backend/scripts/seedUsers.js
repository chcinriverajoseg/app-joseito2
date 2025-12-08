import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar colecciones
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    console.log("🗑️ Colecciones limpiadas");

    const password = await bcrypt.hash("123456", 10);

    // Helper avatar
    const avatar = (name) => `https://i.pravatar.cc/150?u=${name}`;

    // Crear usuarios
    const joseito = await User.create({
      name: "Joseito",
      email: "joseito@example.com",
      password,
      bio: "Soy Joseito 🚀",
      age: 25,
      avatar: avatar("joseito"),
    });

    const maria = await User.create({
      name: "Maria",
      email: "maria@example.com",
      password,
      bio: "Soy Maria 🌸",
      age: 23,
      avatar: avatar("maria"),
    });

    // Dar like mutuo → Match
    joseito.likes.push(maria._id);
    maria.likes.push(joseito._id);
    await joseito.save();
    await maria.save();

    // Crear chat entre ambos
    const chatAB = await Chat.create({ users: [joseito._id, maria._id] });

    // Mensajes iniciales
    await Message.insertMany([
      { chat: chatAB._id, author: joseito._id, text: "Hola María! 🚀 Bienvenida 💬" },
      { chat: chatAB._id, author: maria._id, text: "Hola Joseito 😄 gracias!" },
    ]);

    console.log("🔥 Usuarios creados con match y chat inicial:");
    console.log("Joseito ID:", joseito._id.toString());
    console.log("Maria ID:", maria._id.toString());
    process.exit(0);
  } catch (err) {
    console.error("❌ Error en seed:", err);
    process.exit(1);
  }
}

seed();
