import { roomStore } from "../../store/room.store.js";

const isHost = (roomId: string, userId: string): boolean => {
  const room = roomStore.getRoom(roomId);

  if (!room) return false;

  return room.hostId === userId;
};

export { isHost };
