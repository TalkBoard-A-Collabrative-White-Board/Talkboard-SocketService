import { Server, Socket } from "socket.io";
import { EVENTS } from "../../events.js";
import type { CursorMovePayload } from "./cursor.types.js";

const cursorHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on(EVENTS.CURSOR_MOVE, (data: CursorMovePayload) => {
      socket.to(data.roomId).emit(EVENTS.CURSOR_MOVE, data);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit(EVENTS.CURSOR_LEAVE, {
        socketId: socket.id,
      });
    });
  });
};

export { cursorHandler };
