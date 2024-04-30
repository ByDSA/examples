Especificación del protocolo WebSocket: https://www.rfc-editor.org/rfc/rfc6455

Por defecto, utiliza los mismos puertos que HTTP (80 y 443). Para el handshake, se usa HTTP, pero luego se cambia a WebSocket.

La definición del protocolo WebSocket consta de dos partes:
- [Handshake](./handshake/)
- Mensajes

# Uso del ejemplo
Primero, ejecutar el servidor:
`node --watch server.mjs`

Después ejecutar un cliente o ambos:
- Cliente backend: `node client.mjs`.
- Cliente frontend: abrir `browser/index.html`.

# Referencias
- Definición del protocolo WebSocket: https://www.rfc-editor.org/rfc/rfc6455
- https://blog.erickwendel.com.br/implementing-the-websocket-protocol-from-scratch-using-nodejs
- Formato de los mensajes: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#format