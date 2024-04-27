// Docs: https://nodejs.org/api/permissions.html#enabling

import asserts from "node:assert";
import fs from "node:fs";

const fileCanReadPath = "./file.read";
const fileCantWritePath = "./file.write";

let exists;
let hasPermission;
let content;

// Reading permissions

exists = fs.existsSync(fileCanReadPath);
asserts(exists);
hasPermission = process.permission.has("fs.read", fileCanReadPath);
asserts(hasPermission);

// Writting permissions

exists = fs.existsSync(fileCantWritePath);
asserts(exists);
content = fs.readFileSync(fileCanReadPath, { encoding: "utf8" });
asserts(content, "read");

hasPermission = process.permission.has("fs.write", fileCantWritePath);
asserts(!hasPermission);

try {
  fs.writeFileSync(fileCantWritePath, "content"); // Lanza un error porque este script no está en /tmp/
  throw new Error("Should not be able to write");
} catch { }