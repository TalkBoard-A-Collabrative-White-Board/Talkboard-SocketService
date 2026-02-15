import { connectMongo } from "./DB/mongo.js";
import { httpServer } from "./server.js";
import { initSocket } from "./socket/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

initSocket();
await connectMongo();

httpServer.listen(PORT, () => {
  console.log(`socketService Running on ${PORT}`);
});
