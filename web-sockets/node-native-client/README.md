Desde Node 21 se introdujo la posibilidad de usar, como cliente, el mismo API de WebSockets que se usa en el browser,con el flag `--experimental-websocket`. Desde Node 22, el flag está activado por defecto, pero continúa siendo experimental.

# Probar el ejemplo
Primer, [ejecutar el servidor](../node-raw). Después, el cliente:
```bash
node client.mjs
```