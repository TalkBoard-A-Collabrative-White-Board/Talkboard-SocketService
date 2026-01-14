import { Server, Socket } from "socket.io";
import { EVENTS } from "../../events.js";
import { roomStore } from "../../../store/room.store.js";
import { userStore } from "../../../store/user.store.js";

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
      userStore.set(socket.id, userId, roomId);

      console.log(`User ${userId} Joined Room : ${roomId}`);
    });

    socket.on(EVENTS.ROOM_LEAVE, ({ roomId, userId }) => {
      roomStore.leaveRoom(roomId, userId);
      socket.leave(roomId);

      socket.to(roomId).emit("room:user-left", { userId });

      userStore.remove(socket.id);
      console.log(`User ${userId} left Room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      const userId = userStore.getUser(socket.id);
      if (!userId) return;

      const roomId = userStore.getRoom(userId);
      if (!roomId) return;

      const room = roomStore.getRoom(roomId);
      if (!room) return;

      roomStore.leaveRoom(roomId, userId);

      if (room.hostId === userId) {
        const newHost = roomStore.transferHost(roomId);

        if (newHost) {
          io.to(roomId).emit("room:new-host", { userId: newHost });
        }
      }

      socket.to(roomId).emit("room:user-left", { userId });
      userStore.remove(socket.id);

      console.log(`User: ${userId} Discconnect From ${roomId}`);
    });
  });
};

export { roomHandler };
