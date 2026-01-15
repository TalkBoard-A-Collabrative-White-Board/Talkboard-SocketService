import type { Server, Socket } from "socket.io";
import { drawingService } from "./drawing.server.js";
import { throttle } from "../../utils/throttlle.js";

import type {
  DrawFreeHandPayload,
  DrawLinePayload,
  DrawBatchPayload,
  ErasePayload,
  ClearBoardPayLoad,
  DrawShapePayload,
} from "./drawing.types.js";
import { boardStore } from "../../../store/board.store.js";

const drawingHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("draw:line", (data: DrawLinePayload) => {
      try {
        const processed = drawingService.processLine(data);

        socket.to(data.roomId).emit("draw-line", processed);

        boardStore.addAction(data.roomId, {
          type: "line",
          data: processed,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occured";
        socket.emit("draw:error", { message });
      }
    });

    let freehandBuffer: DrawBatchPayload | null = null;

    const flushFreehand = throttle(() => {
      if (!freehandBuffer) return;

      try {
        const processed = drawingService.processFreehand(freehandBuffer);
        socket.to(freehandBuffer.roomId).emit("draw:batch", processed);
        boardStore.addAction(freehandBuffer.roomId, {
          type: "batch",
          data: processed,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occurred";
        socket.emit("draw:error", { message });
      }

      freehandBuffer = null;
    }, 40);

    socket.on("draw:freehand", (data: DrawFreeHandPayload) => {
      if (!freehandBuffer) {
        freehandBuffer = {
          roomId: data.roomId,
          userId: data.userId,
          points: [],
          color: data.color,
          width: data.width,
        };
      }

      freehandBuffer.points.push(...data.points);
      flushFreehand();
    });

    socket.on("draw:erase", (data: ErasePayload) => {
      try {
        const processed = drawingService.processErase(data);
        socket.to(data.roomId).emit("draw:erase", processed);
        boardStore.addAction(data.roomId, {
          type: "erase",
          data: processed,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occurred";
        socket.emit("draw:error", { message });
      }
    });

    socket.on("draw:clear", (data: ClearBoardPayLoad) => {
      try {
        const processed = drawingService.processClear(data);
        socket.to(data.roomId).emit("draw:clear", processed);
        boardStore.clear(data.roomId);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occurred";
        socket.emit("draw:error", { message });
      }
    });

    socket.on("draw:shape", (data: DrawShapePayload) => {
      try {
        const processed = drawingService.processShape(data);
        socket.to(data.roomId).emit("draw:shape", processed);
        boardStore.addAction(data.roomId, {
          type: "shape",
          data: processed,
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown Error Occurred";
        socket.emit("draw:error", { message });
      }
    });
  });
};

export { drawingHandler };
