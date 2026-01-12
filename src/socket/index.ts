import { roomHandler } from "./modules/room/room.handler.js";
import { io } from "./socket.server.js";

const initSocket = () => {
  roomHandler(io);
};

export { initSocket };
