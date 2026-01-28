import { BoardModel } from "../model/board.model.js";

const TTL_HRS = 24; // Hours For Data To Erase from DataBase

const getExpiryDate = () => new Date(Date.now() + TTL_HRS * 60 * 60 * 1000);

class BoardRepository {
  async save(roomId: string, actions: unknown[]) {
    await BoardModel.findOneAndUpdate(
      { roomId },
      {
        roomId,
        actions,
        expiresAt: getExpiryDate(),
      },
      { upsert: true }
    );
  }

  async get(roomId: string) {
    const doc = await BoardModel.findOne({ roomId });
    return doc?.actions || null;
  }

  async delete(roomId: string) {
    await BoardModel.deleteOne({ roomId });
  }
}

export const boardRepo = new BoardRepository();
