export class Car {
  #price: number;

  constructor() {
    this.#price = 10000;
  }

  get price() {
    return this.#price;
  }

  addPrice(price: number) {
    this.#price += price;
  }
}