export class Car {
  #model: string;
  #price: number;

  constructor(model: string, price: number) {
    this.#model = model;
    this.#price = price;
  }

  get model() {
    return this.#model;
  }
}