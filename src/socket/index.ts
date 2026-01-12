import { io } from "./socket.server.js";

const initSocket = () => {
  io.on("connection", (socket) => {
    console.log(`New Socket Connected ${socket.id}`);
  });
};

export { initSocket };
