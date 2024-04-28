import { glob, globSync } from "node:fs";

const gotJsFiles = globSync("*.js");
console.log("js files in folder:", gotJsFiles);

glob("*.json", (errors, gotJsonFiles) => {
  console.log("json files in folder:", gotJsonFiles);
});