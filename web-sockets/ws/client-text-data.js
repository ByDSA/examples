import WebSocket from "ws";
import { PORT } from "../common.mjs";

const ws = new WebSocket(`ws://localhost:${PORT}`);

ws.on("error", console.error);

ws.on("open", () => {
  const message = "Hello, server! I'm a client";

  console.log("Sending to server:", message);
  ws.send(message);
} );

ws.on("message", (data) => {
  console.log("received: %s", data);
} );