import http from "node:http";
import { PORT, log } from "./common.mjs";
import { prepareHandshakeResponse } from "./handshake/handshake.mjs";
import { readSocket, sendMessage } from "./messaging/messaging.mjs";

const server = http.createServer((_req, res) => {
  res.writeHead(200);
  res.end("Hello World!");
} );

server.on("upgrade", upgradeHandler);

server.listen(PORT, () => log("SERVER", "server runnig at", PORT));

function upgradeHandler(req, socket, _head) {
  const plainHeaders = Object.entries(req.headers).reduce((acc, [key, value]) => {
    acc += `${key}: ${value}\r\n`;

    return acc;
  }, "");

  log("SERVER", "got request from a client:", "\n" + plainHeaders);
  const { "sec-websocket-key": secWebsockerKey } = req.headers;
  const id = Date.now();
  const handshakeResponse = prepareHandshakeResponse(secWebsockerKey);

  log("SERVER", "Sending handshake response to client:", "\n" + handshakeResponse);
  socket.write(handshakeResponse);

  socket.on("readable", () => onSocketReadable(socket));

  setInterval(() => {
    const message = "Interval hello from server!";

    log("SERVER", "sending:", message);
    sendMessage(socket, message);
  }, 3000);

  socket.on("end", _ => {
    log("SERVER", `Client ${id} disconnected!`);
  } );
}

function onSocketReadable(socket) {
  const {data: decoded} = readSocket(socket);
  const data = decoded.toString("utf8");

  log("SERVER", "received:", data);

  sendMessage(socket, "Hello, client! I've received your message.");
}

[
  "uncaughtException",
  "unhandledRejection",
].forEach(event =>
  process.on(event, (err) => {
    console.error(`something bad happened: ${event}, msg: ${err.stack || err}`);
  } ),
);