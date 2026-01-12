import { Server } from "socket.io";
import { httpServer } from "../server.js";

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

export { io };
