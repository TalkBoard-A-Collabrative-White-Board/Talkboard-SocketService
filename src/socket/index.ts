import { drawingHandler } from "./modules/drawing/drawing.handler.js";
import { roomHandler } from "./modules/room/room.handler.js";
import { io } from "./socket.server.js";

const initSocket = () => {
  roomHandler(io);
  drawingHandler(io);
};

export { initSocket };
