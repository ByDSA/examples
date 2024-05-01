Socket.IO utiliza un formato propio sobre WebSockets. Por lo que para poder comunicarse por una conexión WebSocket que use Socket.IO, tanto servidor como cliente deben usar Socket.IO.

En la documentación oficial de Socket.IO dicen:
```
Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
```