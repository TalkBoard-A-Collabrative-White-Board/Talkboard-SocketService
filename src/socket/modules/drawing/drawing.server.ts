import { isHost } from "../../utils/permissions.js";
import type {
  ClearBoardPayLoad,
  DrawFreeHandPayload,
  DrawLinePayload,
  ErasePayload,
} from "./drawing.types.js";

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

  processErase(data: ErasePayload) {
    if (!isHost(data.roomId, data.userId)) {
      throw new Error("Only Host Can Erase");
    }
  }

  processClear(data: ClearBoardPayLoad) {
    if (!isHost(data.roomId, data.userId)) {
      throw new Error("Only Host Can Clear Board");
    }
  }
}

export const drawingService = new DrawingService();
