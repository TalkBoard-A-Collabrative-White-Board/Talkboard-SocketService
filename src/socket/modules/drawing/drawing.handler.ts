import type { Server, Socket } from "socket.io";
import { drawingService } from "./drawing.server.js";
import type { DrawFreeHandPayload, DrawLinePayload } from "./drawing.types.js";

const drawingHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("draw:line", (data: DrawLinePayload) => {
      try {
        const processed = drawingService.processLine(data);

        socket.to(data.roomId).emit("draw-line", processed);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occured";
        socket.emit("draw:error", { message });
      }
    });

    socket.on("draw:freehand", (data: DrawFreeHandPayload) => {
      try {
        const processed = drawingService.processFreehand(data);

        socket.to(data.roomId).emit("draw:freehand", processed);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occured";
        socket.emit("draw:error", { message });
      }
    });
  });
};

export { drawingHandler };
