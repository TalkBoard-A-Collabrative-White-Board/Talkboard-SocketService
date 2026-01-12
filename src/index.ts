import { httpServer } from "./server.js";
import { initSocket } from "./socket/index.js";

initSocket();

httpServer.listen(3000, () => {
  console.log("socketService Running on 3000");
});
