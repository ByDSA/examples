# Primer byte
De izquierda a derecha:
- Bit 0: FIN: indica si es el fragmento final de un mensaje (1=final, 0=no final). Si el mensaje sólo tiene un fragmento, será el fragmento final.
- Bits 1-3: RSV (RSV1, RSV2, RSV3): es 0 si no se ha negociado una extensión que defina un significado para algo distinto a 0. Si se recibe algo distinto de 0, la extensión tiene que darle un sentido. Si ninguna extensión le da sentido, debe fallar la conexión WebSocket.
- Bits 4-7: OPCODE. Define la interpretación del payload:
  - 0x0: frame de continuación.
  - 0x1: frame de texto.
  - 0x2: frame binario.
  - 0x3-7: reservado para uso futuro.
  - 0x8: cierre de conexión.
  - 0x9: ping.
  - 0xA: pong.
  - 0xB-F: reservado para uso futuro.

# Segundo byte
- Bit 0: Mask. Indica si el payload está enmascarado. Si es 1, tendrá una masking-key, que se usará para desenmascarar (unmask) el payload. Todos los frames enviados desde el cliente al servidor tienen este bit a 1.
- Bits 1-7: Payload length.
  - Si es 0-125, es la longitud del payload.
  - Si es 126, los siguientes 2 bytes representan un entero sin signo de 16 bits que indicará la longitud del payload.
  - Si es 127, los siguientes 8 bytes representan un entero sin signo de 64 bits que indica la longitud del payload.