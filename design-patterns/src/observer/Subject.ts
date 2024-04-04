import { Observer } from "./Observer";

export class Subject<TMessage> {
  #observers: Set<Observer<TMessage>>;

  constructor() {
    this.#observers = new Set<Observer<TMessage>>();
  }

  subscribe(observer: Observer<TMessage>) {
    this.#observers.add(observer);
  }

  unsubscribe(observer: Observer<TMessage>) {
    this.#observers.delete(observer);
  }

  notify(data: TMessage) {
    this.#observers.forEach(o => o(data));
  }
}