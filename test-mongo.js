import mongoose from "mongoose";

const uri = "mongodb+srv://josegregoriochacin:kWisN9wyZ4vsmjsE@joseito.s4nsvmv.mongodb.net/app-joseito?retryWrites=true&w=majority&appName=joseito";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Conectado a MongoDB!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error al conectar:", err);
    process.exit(1);
  });
