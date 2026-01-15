type Point = {
  x: number;
  y: number;
};

type DrawLinePayload = {
  roomId: string;
  userId: string;
  from: Point;
  to: Point;
  color: string;
  width: number;
};

type DrawFreeHandPayload = {
  roomId: string;
  userId: string;
  points: Point[];
  color: string;
  width: number;
};

type DrawBatchPayload = {
  roomId: string;
  userId: string;
  points: Point[];
  color: string;
  width: number;
};
type ErasePayload = {
  roomId: string;
  userId: string;
  strokeId: string;
};

type ClearBoardPayLoad = {
  roomId: string;
  userId: string;
};

export type {
  Point,
  DrawLinePayload,
  DrawFreeHandPayload,
  DrawBatchPayload,
  ErasePayload,
  ClearBoardPayLoad,
};
