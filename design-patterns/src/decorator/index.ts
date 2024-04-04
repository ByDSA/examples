import { Car, CarOptions } from "./car";

const basicCar = new Car();

console.log(basicCar.price); // 10000

const carWithOptions = new CarOptions(basicCar);

carWithOptions.addGPS();
carWithOptions.addRims();

console.log(carWithOptions.base.price); // 10800