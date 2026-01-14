import { isHost } from "../../utils/permissions.js";
import type { DrawFreeHandPayload, DrawLinePayload } from "./drawing.types.js";

class DrawingService {
  processLine(data: DrawLinePayload) {
    if (!isHost(data.roomId, data.userId)) {
      throw new Error("Only Host Can Draw");
    }
    return data;
  }

  processFreehand(data: DrawFreeHandPayload) {
    if (!isHost(data.roomId, data.userId)) {
      throw new Error("Only Host Can Draw");
    }
    return data;
  }
}

export const drawingService = new DrawingService();
