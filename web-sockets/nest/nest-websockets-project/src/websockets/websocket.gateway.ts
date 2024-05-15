/* eslint-disable import/no-internal-modules */
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { NumberValidationPipe } from "./common/pipes/number-validation/number-validation.pipe";
import { StringValidationPipe } from "./common/pipes/string-validation/string-validation.pipe";

@WebSocketGateway( {
  cors: true, // Necesario para conexión desde socket.io client en browser con localhost
} )
export class WebsocketGateway
implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
    server: Server;

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ..._args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  // Custom handlers

  @SubscribeMessage("eventMessage")
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody(StringValidationPipe) message: string,
  ) {
    console.log("message from client:", message);

    let sendingMessage;

    // Mensaje al cliente que le ha mandado el mensaje
    sendingMessage = "Answer from server!";
    console.log("sending client emit message:", sendingMessage);
    client.emit("eventServer", sendingMessage);

    // Mensaje a todos los clientes conectados, incluyendo el que envió el mensaje
    sendingMessage = "Server emission message!";
    console.log("sending server emit message:", sendingMessage);
    this.server.emit("eventServer", sendingMessage);

    // Mensaje a todos los clientes excepto a quien mandó el mensaje
    sendingMessage = "Broadcast message from server!";
    console.log("sending client broadcast emit message:", sendingMessage);
    client.broadcast.emit("eventServer", sendingMessage);
  }

  @SubscribeMessage("eventNumber")
  handleNumber(@MessageBody(NumberValidationPipe) n: number) {
    console.log("number from client:", n);
  }
}