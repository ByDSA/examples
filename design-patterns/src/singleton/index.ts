import { DatabaseSingletonClass, getSingletonDatabaseInstance } from "./database";

/* Singleton Class */
console.log('Singleton Class');
const db1 = DatabaseSingletonClass.getInstance();
console.log(db1.getStatus()); // 'Not connected'
const db2 = DatabaseSingletonClass.getInstance();

console.log(db1 === db2); // true

db1.connect();

console.log(db1.getStatus()); // 'Connected'
console.log(db2.getStatus()); // 'Connected'

/* Singleton Module */
console.log('Singleton Module');

const db3 = getSingletonDatabaseInstance();
console.log(db3.getStatus()); // 'Not connected'
const db4 = getSingletonDatabaseInstance();

console.log(db3 === db4); // true

db3.connect();

console.log(db3.getStatus()); // 'Connected'
console.log(db4.getStatus()); // 'Connected'