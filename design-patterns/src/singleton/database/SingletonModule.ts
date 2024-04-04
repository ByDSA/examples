// En caso real, quitar sufijo 'Module'

import Database from "./Database";

let instance: Database | undefined;

export function getInstance() {
  if (!instance)
    instance = new Database();

  return instance;
}