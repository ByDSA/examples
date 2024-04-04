import { Observer } from "./Observer";
import { Subject } from "./Subject";

const subject = new Subject<string>();

const observer1: Observer<string> = data => console.log(`Observer 1 received ${data}`);
const observer2: Observer<string> = data => console.log(`Observer 2 received ${data}`);

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello World');
// Observer 1 received Hello World
// Observer 2 received Hello World

subject.unsubscribe(observer2);

subject.notify('Hello Again');
// Observer 1 received Hello Again