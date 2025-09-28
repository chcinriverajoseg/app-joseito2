import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
