import { WebSocketServer } from "ws";
import { PORT } from "../common.mjs";

const wss = new WebSocketServer( {
  port: PORT,
} );

wss.on("connection", (ws) => {
  console.log("Server connected!");

  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    console.log("received: %s", data);

    if (isBinary) {
      const floatsArray = readFloatLEArray(data);

      console.log("converted to float array:", floatsArray);
    }

    const message = "Answer from server!";

    console.log("sending: %s", message);
    ws.send(message);
  } );
} );

function readFloatLEArray(data) {
  const floatsArray = [];

  for (let i = 0; i < data.length; i += 4) {
    const floatValue = data.readFloatLE(i);

    floatsArray.push(floatValue);
  }

  return floatsArray;
}