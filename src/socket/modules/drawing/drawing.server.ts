import type { DrawFreeHandPayload, DrawLinePayload } from "./drawing.types.js";

class DrawingService {
  processLine(data: DrawLinePayload) {
    return data;
  }

  processFreehand(data: DrawFreeHandPayload) {
    return data;
  }
}

export const drawingService = new DrawingService();
