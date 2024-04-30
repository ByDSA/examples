import http from "node:http"; // se puede usar https
import { PORT, log } from "./common.mjs";
import { readSocket } from "./messaging/messaging.mjs";

const options = {
  port: PORT,
  host: "localhost",
  headers: {
    "Connection": "Upgrade",
    "Upgrade": "websocket",
  },
};
const req = http.request(options);

req.end();

req.on("upgrade", upgradeHandler);

function upgradeHandler(_res, socket, _head) {
  log("CLIENT", "got upgraded!");

  socket.on("readable", () => onSocketReadable(socket));
};

function onSocketReadable(socket) {
  try {
    const { data: decoded } = readSocket(socket);
    const data = decoded.toString("utf8");

    log("CLIENT", "received:", data.toString());
  } catch (error) {
    log("CLIENT", "error:", error.message);
  }
}