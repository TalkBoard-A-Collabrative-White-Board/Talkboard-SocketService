export interface Room {
  roomId: string;
  hostId: string;
  participants: Set<string>;
}

class RoomStore {
  private rooms = new Map<string, Room>();

  createRoom(roomId: string, hostId: string) {
    const room: Room = {
      roomId,
      hostId,
      participants: new Set([hostId]),
    };

    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId: string) {
    return this.rooms.get(roomId);
  }

  joinRoom(roomId: string, userId: string) {
    const room = this.rooms.get(roomId);

    if (!room) return null;

    room.participants.add(userId);
    return room;
  }

  leaveRoom(roomId: string, userId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.participants.delete(userId);
    if (room.participants.size === 0) {
      this.rooms.delete(roomId);
    }
  }
}

export const roomStore = new RoomStore();
