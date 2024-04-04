// En caso real, quitar sufijo 'Class'

import Database from "./Database";

export default class Singleton {
  static #instance: Database | undefined;

  private constructor() {
  }

  static getInstance() {
    if (!this.#instance)
      this.#instance = new Database();

    return this.#instance;
  }
}