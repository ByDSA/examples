import { Car } from "./Car";

export type FactoryProps = {
  model: string;
}
export class Factory {
  createCar({model}: FactoryProps) {
    switch(model) {
      case 'civic':
        return new Car('Honda Civic', 20000);
      case 'accord':
        return new Car('Honda Accord', 25000);
      case 'odyssey':
        return new Car('Honda Odyssey', 30000);
      default:
        throw new Error('Unknown model');
    }
  }
}