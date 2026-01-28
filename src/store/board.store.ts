import { boardRepo } from "../DB/repositories/board.repo.js";

// type BoardAction =
//   | { type: "line"; data: unknown }
//   | { type: "batch"; data: unknown }
//   | { type: "shape"; data: unknown }
//   | { type: "erase"; data: unknown }
//   | { type: "clear" };

class BoardStore {
  private boards = new Map<string, unknown[]>();

  async load(roomId: string) {
    const fromDB = await boardRepo.get(roomId);
    if (fromDB) {
      this.boards.set(roomId, fromDB);
    }
    return this.boards.get(roomId) || [];
  }

  addAction(roomId: string, action: unknown) {
    if (!this.boards.has(roomId)) {
      this.boards.set(roomId, []);
    }
    this.boards.get(roomId)!.push(action);
    boardRepo.save(roomId, this.boards.get(roomId)!);
  }

  get(roomId: string) {
    return this.boards.get(roomId) || [];
  }

  async clear(roomId: string) {
    this.boards.delete(roomId);
    await boardRepo.delete(roomId);
  }
}

export const boardStore = new BoardStore();
