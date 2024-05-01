import WebSocket, { WebSocketServer } from "ws";
import { PORT } from "../common.mjs";

const wss = new WebSocketServer( {
  port: PORT,
} );

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    console.log("received: ", data.toString());
    console.log("Broadcasting...");
    let i = 0;

    wss.clients.forEach((client) => {
      const isNotEmitterClient = client !== ws;

      if (isNotEmitterClient && client.readyState === WebSocket.OPEN) {
        console.log("Sending to client", ++i);
        client.send(data, {
          binary: isBinary,
        } );}
    } );
  } );
} );