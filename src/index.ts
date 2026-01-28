import { connectMongo } from "./DB/mongo.js";
import { httpServer } from "./server.js";
import { initSocket } from "./socket/index.js";
import dotenv from "dotenv";

dotenv.config();

initSocket();
await connectMongo();

httpServer.listen(3000, () => {
  console.log("socketService Running on 3000");
});
