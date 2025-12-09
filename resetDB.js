// backend/resetDB.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";

dotenv.config();

async function resetDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar colecciones
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    console.log("🗑️ Colecciones limpiadas");

    const password = await bcrypt.hash("123456", 10);

    // Helper para avatar único
    const avatar = (name) => `https://i.pravatar.cc/150?u=${name}`;

    // Usuarios principales
    const userA = await User.create({
      name: "Joseito",
      email: "joseito@example.com",
      password,
      bio: "Soy Joseito 🚀",
      age: 25,
      avatar: avatar("joseito"),
    });

    const userB = await User.create({
      name: "Maria",
      email: "maria@example.com",
      password,
      bio: "Soy Maria 🌸",
      age: 23,
      avatar: avatar("maria"),
    });

    // Extras
    const extras = await User.insertMany([
      {
        name: "Pedro",
        email: "pedro@example.com",
        password,
        bio: "Me gusta la música 🎸",
        age: 28,
        avatar: avatar("pedro"),
      },
      {
        name: "Ana",
        email: "ana@example.com",
        password,
        bio: "Amante de los viajes ✈️",
        age: 27,
        avatar: avatar("ana"),
      },
      {
        name: "Luis",
        email: "luis@example.com",
        password,
        bio: "Apasionado del fútbol ⚽",
        age: 26,
        avatar: avatar("luis"),
      },
      {
        name: "Sofía",
        email: "sofia@example.com",
        password,
        bio: "Me encanta la fotografía 📸",
        age: 24,
        avatar: avatar("sofia"),
      },
    ]);

    console.log("👥 Usuarios extra creados:", extras.map((u) => u.name));

    // 🔥 Match Joseito ↔ Maria
    userA.likes.push(userB._id);
    userB.likes.push(userA._id);
    await userA.save();
    await userB.save();

    const chatAB = await Chat.create({ users: [userA._id, userB._id] });
    await Message.insertMany([
      { chat: chatAB._id, author: userA._id, text: "Hola María! 🚀 Bienvenida 💬" },
      { chat: chatAB._id, author: userB._id, text: "Hola Joseito 😄 gracias!" },
    ]);

    console.log("🔥 Match + chat inicial Joseito ↔ Maria");

    // 🎲 Matches aleatorios entre extras
    const randomMatches = [
      [extras[0], extras[3]], // Pedro ↔ Sofía
      [extras[1], extras[2]], // Ana ↔ Luis
    ];

    for (const [u1, u2] of randomMatches) {
      u1.likes.push(u2._id);
      u2.likes.push(u1._id);
      await u1.save();
      await u2.save();

      const chat = await Chat.create({ users: [u1._id, u2._id] });
      await Message.insertMany([
        { chat: chat._id, author: u1._id, text: `Hola ${u2.name}! 👋` },
        { chat: chat._id, author: u2._id, text: `Hola ${u1.name}! 😄` },
      ]);

      console.log(`✨ Match + chat creado entre ${u1.name} ↔ ${u2.name}`);
    }

    console.log("✅ Base de datos poblada con usuarios, matches, chats y avatares");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error en resetDB:", err);
    process.exit(1);
  }
}

resetDB();
