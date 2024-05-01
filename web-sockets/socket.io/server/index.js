import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 1337;
const server = createServer();
const io = new Server(server, {
  path: "/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
} );

io.on("connection", (socket) => {
  console.log("a user connected");

  // Se puede usar el string que se quiera como evento
  // Al emitir un mensaje desde cliente, se deberá usar el mismo string de evento

  socket.on("eventMessage", (message) => {
    console.log("message from client:", message);

    let sendingMessage = "Answer from server!";

    console.log("sending message:", sendingMessage);
    socket.emit("eventServer", sendingMessage);
  } );

  socket.on("eventNumber", (n) =>
    console.log("number from client:", n),
  );
} );

server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
} );