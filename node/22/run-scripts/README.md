# Ejecución nativa de scripts
Permite ejecutar scripts del `package.json` de forma nativa en vez de tener que usar un package manager (ej: `npm run x`, `pnpm run x`), que [es ~200ms más lento](https://github.com/nodejs/node/pull/52190).

La feature aún es experimental.

Sintaxis:
```
node --run <script-in-package-json>
```

Los parámetros que se le pasan al script se concatenan en un solo string (ver y ejecutar `./dev.sh`).