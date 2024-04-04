import { CarFactory } from "./car";

const factory = new CarFactory();

const civic = factory.createCar({model:'civic'});
const accord = factory.createCar({model:'accord'});

console.log(civic.model); // Honda Civic
console.log(accord.model); // Honda Accord