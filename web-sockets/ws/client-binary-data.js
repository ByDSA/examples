import WebSocket from "ws";
import { PORT } from "../common.mjs";

const ws = new WebSocket(`ws://localhost:${PORT}`);

ws.on("error", console.error);

ws.on("open", function open() {
  const array = new Float32Array(5);

  array[0] = 0.5;
  array[1] = 1;
  array[2] = 1.5;
  array[3] = 2;
  array[4] = 2.5;

  console.log("Sending to server:", array);
  ws.send(array); // Automáticamente se envía con el opcode=2, indicando que es un mensaje de tipo binario
} );

ws.on("message", (data) => {
  console.log("received: %s", data);
} );