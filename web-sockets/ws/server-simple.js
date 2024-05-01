import { WebSocketServer } from "ws";
import { PORT } from "../common.mjs";

const wss = new WebSocketServer( {
  port: PORT,
} );

wss.on("connection", (ws) => {
  console.log("Server connected!");

  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("received: %s", data);

    const message = "Answer from server!";

    console.log("sending: %s", message);
    ws.send(message);
  } );
} );