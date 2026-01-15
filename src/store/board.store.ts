type BoardAction =
  | { type: "line"; data: unknown }
  | { type: "batch"; data: unknown }
  | { type: "shape"; data: unknown }
  | { type: "erase"; data: unknown }
  | { type: "clear" };

class BoardStore {
  private boards = new Map<string, BoardAction[]>();

  addAction(roomId: string, action: BoardAction) {
    if (!this.boards.has(roomId)) {
      this.boards.set(roomId, []);
    }
    this.boards.get(roomId)!.push(action);
  }

  getBoard(roomId: string) {
    return this.boards.get(roomId) || [];
  }

  clear(roomId: string) {
    this.boards.delete(roomId);
  }
}

export const boardStore = new BoardStore();
