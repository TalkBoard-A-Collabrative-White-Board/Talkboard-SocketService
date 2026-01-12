import { Server, Socket } from "socket.io";
import { EVENTS } from "../../events.js";
import { roomStore } from "../../../store/room.store.js";

interface JoinRoomPayload {
  roomId: string;
  userId: string;
  isHost?: boolean;
}

const roomHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on(EVENTS.ROOM_JOIN, (data: JoinRoomPayload) => {
      const { roomId, userId, isHost } = data;

      let room = roomStore.getRoom(roomId);

      if (!room && isHost) {
        room = roomStore.createRoom(roomId, userId);
      }

      if (!room) {
        socket.emit(EVENTS.ROOM_ERROR, { message: "Room Not found!" });
        return;
      }

      roomStore.joinRoom(roomId, userId);
      socket.join(roomId);

      socket.emit(EVENTS.ROOM_JOINED, {
        roomId,
        hostId: room.hostId,
        participants: Array.from(room.participants),
      });

      socket.to(roomId).emit("room:user-joined", { userId });

      console.log(`User ${userId} Joined Room : ${roomId}`);
    });
  });
};

export { roomHandler };
