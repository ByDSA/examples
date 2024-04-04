import { Car } from "./Car";

// Decorator
export class CarOptions {
  #base: Car;

  constructor(base: Car) {
    this.#base = base;
  }

  addGPS() {
    this.#base.addPrice(500);
  }

  addRims() {
    this.#base.addPrice(300);
  }

  get base() {
    return this.#base;
  }
}