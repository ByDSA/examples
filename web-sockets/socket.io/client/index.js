import { io } from "socket.io-client";

const PORT = 1337;
const socket = io("ws://localhost:" + PORT);

socket.on("connect", () => {
  console.log("Connected to server!");

  let message = "Hello from client!";

  console.log("sending message:", message);
  socket.emit("eventMessage", message);

  message = 456;
  console.log("sending message:", message);
  socket.emit("eventNumber", 456);
} );

// Se puede usar el string que se quiera como evento
// Al emitir un mensaje desde cliente, se deberá usar el mismo string de evento

socket.on("eventServer", (message) => {
  console.log("message received:", message);
} );