import type { Server, Socket } from "socket.io";
import { EVENTS } from "../../events.js";
import type {
  WebRTCAnswerPayload,
  WebRTCIcePayload,
  WebRTCOfferPayload,
} from "./webrtc.types.js";

const webrtcHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on(EVENTS.WEBRTC_JOIN, ({ roomId, userId }) => {
      socket.join(roomId);

      socket.to(roomId).emit(EVENTS.WEBRTC_JOIN, {
        userId,
      });

      console.log(`User ${userId} joined audio in room ${roomId}`);
    });

    socket.on(EVENTS.WEBRTC_OFFER, (data: WebRTCOfferPayload) => {
      io.to(data.roomId).emit(EVENTS.WEBRTC_OFFER, data);
    });

    socket.on(EVENTS.WEBRTC_ANSER, (data: WebRTCAnswerPayload) => {
      io.to(data.roomId).emit(EVENTS.WEBRTC_ANSER, data);
    });

    socket.on(EVENTS.WEBRTC_ICE, (data: WebRTCIcePayload) => {
      io.to(data.roomId).emit(EVENTS.WEBRTC_ICE, data);
    });

    socket.on(EVENTS.WEBRTC_LEAVE, ({ roomId, userId }) => {
      socket.to(roomId).emit(EVENTS.WEBRTC_LEAVE, { userId });
    });
  });
};

export { webrtcHandler };
