# Client: Opening handshake
Se utiliza para ser compatible con servidores HTTP, permitiendo al servidor HTTP comunicarse por HTTP y por WS.

El WebSocket client envía un request:
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

Headers HTTP:
- Request-URI. Se usa para identificar el endpoint de la conexión del WebSocket. Tanto para permitir múltiples dominios desde la misma IP como permitir múltiples endpoints de WebSocket en el mismo servidor. Ej: `GET /chat HTTP/1.1`
- `Host`. El host que quiere usar el cliente para la comunicación WebSocket. Ej: `server.example.com`.
- `Origin` (opcional). Se usa para protegerse contra ataques CSRF. El servidor puede rechazar la conexión si el origen no es el esperado. Este header se manda automáticamente desde browser clients. Para otro tipo de cliente, se podría enviar explícitamente, si es que tiene sentido en el contexto de estos clientes.

Headers para WS:
- `Upgrade: websocket` y  `Connection: Upgrade` (obligatorios). Indica que el cliente quiere cambiar el protocolo de comunicación a WebSocket.
- `Sec-WebSocket-Key`. Es un valor aleatorio en base64. Ej: `dGhlIHNhbXBsZSBub25jZQ==`.
- `Sec-WebSocket-Protocol` (opcional): los protocolos (de capa de aplicación) que acepta el cliente. Luego el servidor indicará en su respuesta aquél que ha elegido (o si no ha elegido ninguno). Ejemplo: `chat`, `soap`.
- `Sec-WebSocket-Extensions` (opcional): list of extensions support by the client.

# Servidor
El servidor tiene que recoger el valor del header `Sec-WebSocket-Key`, que está en base64 (no deben considerarse trailing whitespaces del valor del header). Luego, concatenarle el GUID `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` en forma de string, el cual es poco probable que lo utilicen endpoints que no entiendan el protocolo WebSocket. De la concatenación, calcular su hash SHA1, codificarlo en base64 y enviarlo en el header `Sec-WebSocket-Accept` de la respuesta.

Ejemplo de respuesta:
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

- Cualquier status code diferente de `101` indica que el handshake no se ha podido completar (usando la semántica HTTP). Para el texto del estado, se puede poner lo que se quiera, pero en la especificación del protocolo usan `Switching Protocols`.

Headers opcionales:
- `Sec-WebSocket-Protocol`. El protocolo que ha elegido el servidor. El servidor debe de haber verificado que seleccione un protocolo basándose en la lista de protocolos enviados por el cliente (en el header con el mismo nombre). Luego el cliente deberá verificar que el protocolo elegido es uno de los que había propuesto.