import { cursorHandler } from "./modules/cursor/cursor.handler.js";
import { drawingHandler } from "./modules/drawing/drawing.handler.js";
import { roomHandler } from "./modules/room/room.handler.js";
import { io } from "./socket.server.js";

const initSocket = () => {
  roomHandler(io);
  drawingHandler(io);
  cursorHandler(io);
};

export { initSocket };
