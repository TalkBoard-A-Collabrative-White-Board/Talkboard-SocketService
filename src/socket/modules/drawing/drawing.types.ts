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

type ShapeType = "rect" | "circle" | "text";

type DrawShapePayload = {
  roomId: string;
  userId: string;
  shapeId: string;
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  color: string;
};

export type {
  Point,
  DrawLinePayload,
  DrawFreeHandPayload,
  DrawBatchPayload,
  ErasePayload,
  ClearBoardPayLoad,
  ShapeType,
  DrawShapePayload,
};
