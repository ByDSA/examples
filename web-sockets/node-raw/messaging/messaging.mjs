const MAXIMUM_SIXTEEN_BITS_INTEGER = 2 ** 16; // 65536
const OPCODE_TEXT = 0b00000001;
const SEVEN_BITS_INTEGER_MARKER = 125;
const SIXTEEN_BITS_INTEGER_MARKER = 126;
const FIN_BIT = 0b10000000;
const MASK_KEY_BYTES_LENGTH = 4;

import { log } from "../common.mjs";

export function sendMessage(socket, msg) {
  const data = prepareMessage(msg);

  socket.write(data);
}

function prepareMessage(message) {
  const msg = Buffer.from(message);
  const messageSize = msg.length;
  let dataFrameBuffer;
  const firstByte = FIN_BIT | OPCODE_TEXT; // single frame + text

  if (messageSize <= SEVEN_BITS_INTEGER_MARKER) {
    const bytes = [firstByte];

    dataFrameBuffer = Buffer.from(bytes.concat(messageSize));
  } else if (messageSize <= MAXIMUM_SIXTEEN_BITS_INTEGER) {
    const offsetFourBytes = 4;
    const target = Buffer.allocUnsafe(offsetFourBytes);

    target[0] = firstByte;
    target[1] = SIXTEEN_BITS_INTEGER_MARKER | 0x0; // just to know the mask

    target.writeUint16BE(messageSize, 2); // content lenght is 2 bytes
    dataFrameBuffer = target;

    // alloc 4 bytes
    // [0] - 128 + 1 - 10000001  fin + opcode
    // [1] - 126 + 0 - payload length marker + mask indicator
    // [2] 0 - content length
    // [3] 113 - content length
    // [ 4 - ..] - the message itself
  } else
    throw new Error("message too long");

  const totalLength = dataFrameBuffer.byteLength + messageSize;
  const dataFrameResponse = concat([ dataFrameBuffer, msg], totalLength);

  return dataFrameResponse;
}

function concat(bufferList, totalLength) {
  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (const buffer of bufferList) {
    target.set(buffer, offset);
    offset += buffer.length;
  }

  return target;
}

function unmask(encodedBuffer, maskKey) {
  const finalBuffer = Buffer.from(encodedBuffer);

  for (let index = 0; index < encodedBuffer.length; index++)
    finalBuffer[index] = encodedBuffer[index] ^ maskKey[index % MASK_KEY_BYTES_LENGTH];

  return finalBuffer;
}

const OPCODE_LABEL = {
  0x00: "continuation",
  0x01: "text",
  0x02: "binary",
  0x08: "close",
  0x09: "ping",
  0x0A: "pong",
};

export function readSocket(socket) {
  log("CLIENT|SERVER", "Leyendo socket...");
  // Primer byte: FIN (1), RSV (3), OPCODE (4)
  let chunk = socket.read(1);
  const FIN = (chunk[0] & 0b10000000) >> 7;
  const RSV = (chunk[0] & 0b01110000) >> 4;
  const OPCODE = chunk[0] & 0b00001111;

  console.log("FIN:", FIN, "RSV:", RSV, "OPCODE:", OPCODE_LABEL[OPCODE]);

  if (RSV !== 0)
    throw new Error("RSV must be 0");

  // Segundo byte: MASK (1), PAYLOAD LENGTH (7)
  chunk = socket.read(1);

  const mask = (chunk[0] & 0b10000000) >> 7;
  const readPayloadLengh = (chunk[0] & 0b01111111);

  console.log("MASK:", mask, "PAYLOAD LENGTH:", readPayloadLengh);

  let payloadLengh = 0;

  if (readPayloadLengh <= SEVEN_BITS_INTEGER_MARKER)
    payloadLengh = readPayloadLengh;
  else if (readPayloadLengh === SIXTEEN_BITS_INTEGER_MARKER) {
    // unsigned, big-endian 16-bit integer [0 - 65K] - 2 ** 16
    payloadLengh = socket.read(2).readUint16BE(0);
  } else
    throw new Error("your message is too long! we don't handle 64-bit messages");

  // Masking-key
  const maskingKey = mask === 1 ? socket.read(MASK_KEY_BYTES_LENGTH) : null;

  console.log("Masking-key:", maskingKey);
  // Payload data
  const extensionDataLength = 0;
  const extensionData = socket.read(extensionDataLength);

  if (extensionData)
    console.log("Extension data:", extensionData.toString());

  const applicationDataLength = readPayloadLengh - extensionDataLength;
  const applicationData = socket.read(applicationDataLength);

  console.log("Application data:", applicationData.toString());
  const decodedApplicationData = maskingKey === null ? null : unmask(applicationData, maskingKey);

  if (decodedApplicationData !== null)
    console.log("Decoded application data:", decodedApplicationData.toString());

  return {
    length: payloadLengh,
    data: maskingKey === null ? applicationData : decodedApplicationData,
  };
}