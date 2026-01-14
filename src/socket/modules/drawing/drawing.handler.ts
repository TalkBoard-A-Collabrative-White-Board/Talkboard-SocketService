import type { Server, Socket } from "socket.io";
import { drawingService } from "./drawing.server.js";
import type { DrawFreeHandPayload, DrawLinePayload } from "./drawing.types.js";

const drawingHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("draw:line", (data: DrawLinePayload) => {
      const processed = drawingService.processLine(data);

      socket.to(data.roomId).emit("draw-line", processed);
    });

    socket.on("draw:freehand", (data: DrawFreeHandPayload) => {
      const processed = drawingService.processFreehand(data);

      socket.to(data.roomId).emit("draw:freehand", processed);
    });
  });
};

export { drawingHandler };
