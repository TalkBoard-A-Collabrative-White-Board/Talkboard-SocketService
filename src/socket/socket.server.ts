import { Server } from "socket.io";
import { httpServer } from "../server.js";

const io = new Server(httpServer, {
  cors: { origin: 'https://talkboard-j6oe.onrender.com' },
});

export { io };
