import crypto from "node:crypto";

const WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function createSocketAccept (id) {
  const hash = crypto.createHash("sha1");

  hash.update(id + WEBSOCKET_MAGIC_STRING_KEY);

  return hash.digest("base64");
}

export function prepareHandshakeResponse(id) {
  const acceptKey = createSocketAccept(id);
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
  ];

  if (id)
    headers.push(`sec-webSocket-accept: ${acceptKey}`);

  // This empty line MUST be present for the response to be valid
  headers.push("");

  return headers.map(line => line.concat("\r\n")).join("");
}