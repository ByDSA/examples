const socket = new WebSocket("ws://localhost:1337");

socket.onopen = (event) => {
  console.log("WebSocket is connected!");
  const message = "Hello world from backend client!";

  console.log("Sending:", message);
  socket.send(message);
};

socket.onmessage = (msg) => {
  const message = msg.data;

  console.log("Received message:", message);
};

socket.onerror = (error) => console.log("WebSocket error", error);

socket.onclose = (event) => console.log("Disconnected from the WebSocket server");